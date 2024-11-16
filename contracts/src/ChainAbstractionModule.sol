// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

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

interface ISafe {
    function execTransactionFromModule(
        address to,
        uint256 value,
        bytes calldata data,
        Enum.Operation operation
    ) external returns (bool success);
}

contract ChainAbstractionModule {
    mapping(uint256 => Transaction) public orderBook;

    uint256 internal txnCount;
    uint16 internal n;
    uint256 public constant FILL_DEADLINE_BUFFER = 18000;
    uint32 public eid;

    ISpokePool public spokePool;

    constructor(address _spokePool, uint32 _eid) {
        spokePool = ISpokePool(_spokePool);
        eid = _eid;

        // Testing purposes
        bytes memory incrementCountCalldata = abi.encodeWithSelector(
            Counter.increment.selector
        );
        Order[] memory _orders = new Order[](1);
        _orders[0] = Order({
            tokenIn: 0x4200000000000000000000000000000000000006,
            tokenOut:0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14,
            amount: 100000000000000,
            eid: 0,
            chainId: 84532
        });
        createTransaction(
            0x4Ff6d608f41c53DB6cf189648B843f5F4cb545d1,
            0,
            incrementCountCalldata,
            0x37d9Bcb63118cbD2cdE1d0E24379a876d687738A,
            _orders
        );
    }

    function handleCrossChainSwapOrder(
        uint256 transactionId,
        address recipent,
        uint256 relayFee,
        bytes memory message
    ) public {
        Transaction storage txn = orderBook[transactionId];
        Order memory order = getOrder(transactionId, eid);

        uint256 currentTimestamp = block.timestamp - 36;
        uint256 fillDeadline = currentTimestamp + FILL_DEADLINE_BUFFER;
        ISafe safe = ISafe(txn.from);
        bytes memory data = abi.encodeWithSignature(
            "depositV3(address,address,address,address,uint256,uint256,uint256,address,uint32,uint32,uint32,bytes)",
            txn.from,
            recipent,
            order.tokenOut,
            order.tokenIn,
            order.amount,
            order.amount - relayFee,
            order.chainId,
            address(0),
            currentTimestamp,
            fillDeadline,
            0,
            message
        );
        bool success = safe.execTransactionFromModule(
            address(spokePool),
            order.amount,
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
    ) public view returns (Order memory) {
        Transaction storage txn = orderBook[_transactionId];
        for (uint i = 0; i < txn.orders.length; i++) {
            if (txn.orders[i].eid == _eid) {
                return txn.orders[i];
            }
        }
    }
}
