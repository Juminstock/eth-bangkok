// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Counter} from "./Counter.sol";
import {ChainAbstractionModule} from "./ChainAbstractionModule.sol";

contract MessageHelper {
    struct Call {
        address target;
        bytes callData;
        uint256 value;
    }
    struct Instructions {
        //  Calls that will be attempted.
        Call[] calls;
        // Where the tokens go if any part of the call fails.
        // Leftover tokens are sent here as well if the action succeeds.
        address fallbackRecipient;
    }

    Call[] public calls;

    function generateMessageForMulticallHandler(
        address _userAddress,
        address _target,
        uint256 _id
    ) public returns (bytes memory) {
        bytes memory incrementCountCalldata = abi.encodeWithSelector(
            ChainAbstractionModule.fulfillTransaction.selector, _id
        );


        calls.push(Call({
            target: _target,
            callData: incrementCountCalldata,
            value: 0
        }));


        Instructions memory instructions = Instructions({
            calls: calls,
            fallbackRecipient: _userAddress
        });
        return abi.encode(instructions);
    }

    function decode (bytes memory message) public view returns (Instructions memory){
        Instructions memory instructions = abi.decode(message, (Instructions));
        return instructions;
    }   

    function generateMessageForCustomHandler(address counter) public pure returns (bytes memory){
        return abi.encode(counter);
    }


}
