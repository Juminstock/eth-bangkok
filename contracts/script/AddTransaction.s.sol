// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {ChainAbstractionModule, Order} from "../src/ChainAbstractionModule.sol";
import {Counter} from "../src/Counter.sol";



contract AddTransaction is Script{
    ChainAbstractionModule public module;

    function setUp() public {
        module = ChainAbstractionModule(0x5dc50f5adB4C746eFDf8f3E685E76540445Af26A);
    }
    function run() public {
        vm.startBroadcast();
        bytes memory incrementCountCalldata = abi.encodeWithSelector(
            Counter.increment.selector
        );
        Order[] memory _orders = new Order[](1);
        _orders[0] = Order({
            tokenIn: 0x4200000000000000000000000000000000000006,
            tokenOut: 0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14,
            amount: 100000000000000,
            eid: 0,
            chainId: 84532
        });
        module.createTransaction(
            0x4Ff6d608f41c53DB6cf189648B843f5F4cb545d1,
            0,
            incrementCountCalldata,
            0x37d9Bcb63118cbD2cdE1d0E24379a876d687738A,
            _orders
        );
        vm.stopBroadcast();
    }
}
