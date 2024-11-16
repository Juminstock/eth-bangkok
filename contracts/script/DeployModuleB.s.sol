// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {ChainAbstractionModule} from "../src/ChainAbstractionModule.sol";



interface ISafe {
    function enableModule(address module) external;
}


contract DeployModuleB is Script {
    ChainAbstractionModule public module;

    function setUp() public {
    }

    function run() public {
        vm.startBroadcast();
        module = new ChainAbstractionModule(address(0), 40245, 0x6EDCE65403992e310A62460808c4b910D972f10f, 4294967295, 0x924a9f036260DdD5808007E1AA95f08eD08aA569);
        // module.setCrossChainModule(40245, 0xB20405f94d4A34439AD894789A136Dfd1032F22C);
        console.log("Module address: ", address(module));
        vm.stopBroadcast();
    }
}
