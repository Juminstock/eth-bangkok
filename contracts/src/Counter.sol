// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

contract Counter {
    uint256 public count;
    event Increment(uint256 count);

    function increment() public {
        count += 1;
        emit Increment(count);
    }
}