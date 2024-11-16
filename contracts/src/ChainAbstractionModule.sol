// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ILayerZeroEndpointV2, MessagingFee, MessagingReceipt, Origin} from "@layerzerolabs/lz-evm-protocol-v2/contracts/interfaces/ILayerZeroEndpointV2.sol";
import {AddressCast} from "@layerzerolabs/lz-evm-protocol-v2/contracts/libs/AddressCast.sol";
import {ReadCodecV1, EVMCallComputeV1, EVMCallRequestV1} from "@layerzerolabs/oapp-evm/contracts/oapp/libs/ReadCodecV1.sol";
import {OAppOptionsType3} from "@layerzerolabs/oapp-evm/contracts/oapp/libs/OAppOptionsType3.sol";
import {OAppRead} from "@layerzerolabs/oapp-evm/contracts/oapp/OAppRead.sol";
import "./Enum.sol";
import {ISpokePool} from "./interfaces/ISpokePool.sol";
import {Counter} from "./Counter.sol";

struct Order {
    address tokenIn;
    address tokenOut;
    uint256 amount;
    uint32 eid;
    uint32 chainId;
}

struct Transaction {
    address from;
    address to;
    uint256 value;
    bytes data;
    Order[] orders;
}

event TransactionCreated(
    address indexed from,
    address indexed to,
    uint256 value,
    bytes data,
    uint256 id
);

event OrderSettled(
    address tokenIn,
    address tokenOut,
    uint256 amount,
    uint32 eid,
    uint32 chainId,
    address account
);

interface ISafe {
    function execTransactionFromModule(
        address to,
        uint256 value,
        bytes calldata data,
        Enum.Operation operation
    ) external returns (bool success);
}

contract ChainAbstractionModule is OAppRead, OAppOptionsType3 {
    mapping(uint256 => Transaction) public orderBook;
    mapping(uint32 => address) public crossChainModules;
    mapping(uint256 => bytes) public crosschainMessages;

    uint256 internal txnCount;
    uint256 public constant FILL_DEADLINE_BUFFER = 18000;
    uint32 public eid;
    ISpokePool public spokePool;
    address public multicallHandler;

    /// @notice LayerZero read message type.
    uint8 private constant READ_MSG_TYPE = 1;

    /// @notice LayerZero read channel ID.
    uint32 public READ_CHANNEL;

    constructor(
        address _spokePool,
        uint32 _eid,
        address _endpoint,
        uint32 _readChannel,
        address _multicallHandler
    ) OAppRead(_endpoint, msg.sender) Ownable(msg.sender) {
        spokePool = ISpokePool(_spokePool);
        eid = _eid;
        READ_CHANNEL = _readChannel;
        multicallHandler = _multicallHandler;
        _setPeer(READ_CHANNEL, AddressCast.toBytes32(address(this)));
    }

    function setCrossChainModule(
        uint32 _eid,
        address _module
    ) public onlyOwner {
        crossChainModules[_eid] = _module;
    }

    function handleCrossChainSwapOrder(
        address account,
        address tokenOut,
        address tokenIn,
        uint256 transactionId,
        uint256 relayFee,
        uint256 amount,
        uint32 chainId,
        bytes memory message
    ) internal {

        uint256 currentTimestamp = block.timestamp - 36;
        uint256 fillDeadline = currentTimestamp + FILL_DEADLINE_BUFFER;
        ISafe safe = ISafe(account);
        bytes memory data = abi.encodeWithSignature(
            "depositV3(address,address,address,address,uint256,uint256,uint256,address,uint32,uint32,uint32,bytes)",
            account,
            multicallHandler,
            tokenOut,
            tokenIn,
            amount,
            amount - relayFee,
            chainId,
            address(0),
            currentTimestamp,
            fillDeadline,
            0,
            message
        );
        bool success = safe.execTransactionFromModule(
            address(spokePool),
            amount,
            data,
            Enum.Operation.Call
        );
        require(success, "Safe transaction failed");
    }

    function fulfillTransaction(uint256 _transactionId) public {
        Transaction storage txn = orderBook[_transactionId];
        ISafe safe = ISafe(txn.from);
        bool success = safe.execTransactionFromModule(
            txn.to,
            txn.value,
            txn.data,
            Enum.Operation.Call
        );
        require(success, "Safe transaction failed");
        delete orderBook[_transactionId];
    }

    function createTransaction(
        address _to,
        uint256 _value,
        bytes memory _data,
        address account,
        Order[] memory _orders
    ) public {
        orderBook[txnCount] = Transaction({
            from: account,
            to: _to,
            value: _value,
            data: _data,
            orders: _orders
        });

        emit TransactionCreated(msg.sender, _to, _value, _data, txnCount);

        txnCount++;
    }

   function getOrder(
        uint256 _transactionId,
        uint32 _eid
    ) public view returns (address,address,address,uint256,uint256,uint32,uint32) {
        Transaction storage txn = orderBook[_transactionId];
        for (uint i = 0; i < txn.orders.length; i++) {
            if (txn.orders[i].eid == _eid) {
                Order memory order = txn.orders[i];
                return (
                    order.tokenIn,
                    order.tokenOut,
                    txn.from,
                    order.amount,
                    _transactionId,
                    order.eid,
                    order.chainId
                );
            }
        }
    }

    function readModule(
        uint256 transactionId,
        uint32 targetEid,
        bytes calldata _extraOptions,
        bytes calldata message
    ) external payable returns (MessagingReceipt memory receipt) {
        crosschainMessages[transactionId] = message;
        bytes memory cmd = getCmd(transactionId, targetEid);
        return
            _lzSend(
                READ_CHANNEL,
                cmd,
                combineOptions(READ_CHANNEL, READ_MSG_TYPE, _extraOptions),
                MessagingFee(msg.value, 0),
                payable(msg.sender)
            );
    }

    function getReadModuleQuote(
        bool _payInLzToken,
        uint256 _transactionId,
        uint32 _targetEid,
        bytes calldata _extraOptions
    ) external view returns (MessagingFee memory fee) {
        bytes memory cmd = getCmd(_transactionId, _targetEid);
        return
            _quote(
                READ_CHANNEL,
                cmd,
                combineOptions(READ_CHANNEL, READ_MSG_TYPE, _extraOptions),
                _payInLzToken
            );
    }

    function getCmd(
        uint256 _transactionId,
        uint32 targetEid
    ) public view returns (bytes memory) {
        require(
            crossChainModules[targetEid] != address(0),
            "Cross-chain module not set"
        );

        EVMCallRequestV1[] memory readRequests = new EVMCallRequestV1[](1);
        bytes4 selector = bytes4(keccak256("getOrder(uint256,uint32)"));
        bytes memory callData = abi.encodeWithSelector(
            selector,
            _transactionId,
            eid
        );

        EVMCallRequestV1 memory readRequest = EVMCallRequestV1({
            appRequestLabel: 1,
            targetEid: targetEid,
            isBlockNum: false,
            blockNumOrTimestamp: uint64(block.timestamp),
            confirmations: 1,
            to: crossChainModules[targetEid],
            callData: callData
        });

        readRequests[0] = readRequest;

        return ReadCodecV1.encode(0, readRequests);
    }

    function setReadChannel(
        uint32 _channelId,
        bool _active
    ) public override onlyOwner {
        _setPeer(
            _channelId,
            _active ? AddressCast.toBytes32(address(this)) : bytes32(0)
        );
        READ_CHANNEL = _channelId;
    }

    function _lzReceive(
        Origin calldata,
        bytes32 /*_guid*/,
        bytes calldata _message,
        address,
        bytes calldata
    ) internal override {
        (address tokenIn, address tokenOut, address account, uint256 amount, uint256 transactionId ,uint32 eid, uint32 chainId) = abi.decode(
            _message,
            (address,address,address,uint256,uint256,uint32,uint32)
        );
        emit OrderSettled(
            tokenIn,
            tokenOut,
            amount,
            eid,
            chainId,
            account
        );
        
        handleCrossChainSwapOrder(
            account,
            tokenOut,
            tokenIn,
            transactionId,
            900000000000,
            amount,
            chainId,
            crosschainMessages[transactionId]
        );
    }
}
