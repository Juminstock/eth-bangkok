// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "./Enum.sol";
import {ISpokePool} from "./interfaces/ISpokePool.sol";

struct Order {
    address account;
    address tokenIn;
    address tokenOut;
    uint256 amount;
}

struct Transaction {
    address from;
    address to;
    uint256 value;
    bytes data;
}

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
    uint256 public transactionId;

    uint16 internal n;
    mapping(uint16 => Order) public orders;

    uint256 public constant FILL_DEADLINE_BUFFER = 18000;

    ISpokePool public spokePool;

    constructor(address _spokePool) {
        spokePool = ISpokePool(_spokePool);
    }

    function handleCrossChainSwapOrder(
        address account,
        address tokenIn,
        address tokenOut,
        uint256 amount,
        uint256 relayFee,
        uint256 chainId
    ) public {
        uint256 currentTimestamp = block.timestamp - 36;
        uint256 fillDeadline = currentTimestamp + FILL_DEADLINE_BUFFER;
        ISafe safe = ISafe(0x37d9Bcb63118cbD2cdE1d0E24379a876d687738A);
        bytes memory data = abi.encodeWithSignature(
            "depositV3(address,address,address,address,uint256,uint256,uint256,address,uint32,uint32,uint256,bytes)",
            account,
            account,
            tokenOut,
            tokenIn,
            amount,
            amount - relayFee,
            chainId,
            address(0),
            currentTimestamp,
            fillDeadline,
            0,
            ""
        );
        bool success = safe.execTransactionFromModule(
            address(spokePool),
            0,
            data,
            Enum.Operation.Call
        );
        require(success, "Safe transaction failed");
    }

    // function getOrder(uint16 _orderId) public view returns (Order memory) {
    //     return orders[_orderId];
    // }

    // function setOrder(
    //     address tokenIn,
    //     address tokenOut,
    //     uint256 amount
    // ) public {
    //     orders[n] = Order(msg.sender, tokenIn, tokenOut, amount);
    //     n++;
    // }

    // function createTransaction(
    //     address _to,
    //     uint256 _value,
    //     bytes calldata _data
    // ) public returns (uint256) {
    //     transactionId++;
    //     orderBook[transactionId] = Transaction({
    //         from: msg.sender,
    //         to: _to,
    //         value: _value,
    //         data: _data
    //     });

    //     return transactionId;
    // }

    // function getTransaction(
    //     uint256 _transactionId
    // )
    //     external
    //     view
    //     returns (address from, address to, uint256 value, bytes memory data)
    // {
    //     Transaction storage txn = orderBook[_transactionId];
    //     return (txn.from, txn.to, txn.value, txn.data);
    // }

    // function _executeTransaction(
    //     address to,
    //     uint256 value,
    //     bytes calldata data
    // ) internal returns (bool) {
    //     bool success = ISafe(txn.from).execTransactionFromModule(
    //         to,
    //         value,
    //         data,
    //         Enum.Operation.DelegateCall
    //     );
    //     require(success, "Transaccion fallida");
    //     return success;
    // }

    // function executeTransaction() public {
    //     _executeTransaction(safe.to, safe.value, safe.data);
    // }
}
