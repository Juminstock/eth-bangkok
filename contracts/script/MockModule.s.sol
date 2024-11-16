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
        module = new ChainAbstractionModule(0x5ef6C01E11889d86803e0B23e3cB3F9E9d97B662, 40161, 0x6EDCE65403992e310A62460808c4b910D972f10f, 4294967295);
        module.setCrossChainModule(40245, 0x054E0eBC90a2B86c9cAb010b48F0d35CAdD3dE85);
        console.log("Module address: ", address(module));
        vm.stopBroadcast();
    }
}
