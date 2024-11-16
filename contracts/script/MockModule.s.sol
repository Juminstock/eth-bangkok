// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {ChainAbstractionModule} from "../src/ChainAbstractionModule.sol";



interface ISafe {
    function enableModule(address module) external;
}


contract MockModule is Script {
    ChainAbstractionModule public module;

    function setUp() public {
    }

    function run() public {
        vm.startBroadcast();
        module = new ChainAbstractionModule(0x5ef6C01E11889d86803e0B23e3cB3F9E9d97B662);
        // ISafe(0x37d9Bcb63118cbD2cdE1d0E24379a876d687738A).enableModule(address(module));
        console.log("Module address: ", address(module));
        vm.stopBroadcast();
    }
}
