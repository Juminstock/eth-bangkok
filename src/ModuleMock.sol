// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

struct Order {
    address account;
    address tokenIn;
    address tokenOut;
    uint256 amount;
}

contract ModuleMock {
    uint16 internal n;
    mapping(uint16 => Order) public orders;

    function getOrder(uint16 _orderId) public view returns (Order memory) {
        return orders[_orderId];
    }

    function setOrder(
        address tokenIn,
        address tokenOut,
        uint256 amount
    ) public {
        orders[n] = Order(msg.sender, tokenIn, tokenOut, amount);
        n++;
    }
}
