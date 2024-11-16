// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {ILayerZeroEndpointV2, MessagingFee, MessagingReceipt, Origin} from "@layerzerolabs/lz-evm-protocol-v2/contracts/interfaces/ILayerZeroEndpointV2.sol";
import {AddressCast} from "@layerzerolabs/lz-evm-protocol-v2/contracts/libs/AddressCast.sol";

import {ReadCodecV1, EVMCallComputeV1, EVMCallRequestV1} from "@layerzerolabs/oapp-evm/contracts/oapp/libs/ReadCodecV1.sol";
import {OAppOptionsType3} from "@layerzerolabs/oapp-evm/contracts/oapp/libs/OAppOptionsType3.sol";
import {OAppRead} from "@layerzerolabs/oapp-evm/contracts/oapp/OAppRead.sol";
import {ChainAbstractionModule} from "./ChainAbstractionModule.sol";

struct Order {
    address tokenIn;
    address tokenOut;
    uint256 amount;
    uint32 eid;
    uint32 chainId;
}

event OrderSettled(
    address tokenIn,
    address tokenOut,
    uint256 amount,
    uint32 eid,
    uint32 chainId,
    address account
);

contract Reader is OAppRead, OAppOptionsType3 {
    event Read(address token, uint256 amount);

    /// @notice LayerZero read message type.
    uint8 private constant READ_MSG_TYPE = 1;

    /// @notice LayerZero read channel ID.
    uint32 public READ_CHANNEL;

    /// @notice Struct to hold chain-specific configurations.
    struct ChainConfig {
        uint16 confirmations; // Number of confirmations required
        address quoterAddress; // Address of the Uniswap V3 QuoterV2 contract
        address tokenInAddress; // Address of WETH on the target chain
        address tokenOutAddress; // Address of USDC on the target chain
        uint24 fee; // Pool fee for WETH/USDC pair
    }

    /// @notice Array to store all active targetEids for iteration.
    uint32[] public targetEids;

    /// @notice Mapping to store chain configurations indexed by target chain ID (targetEid).
    mapping(uint32 => ChainConfig) public chainConfigs;

    // ===========================
    // ======== CONSTANTS ========
    // ===========================

    // Define constants for chain endpoint ids and addresses for clarity.

    // Example Chain A: Ethereum Mainnet
    uint32 public constant CHAIN_A_EID = 40245; // LayerZero EID for Ethereum Mainnet
    uint32 public constant CHAIN_A_ID = 11155111; // Chain ID for Ethereum Mainnet
    address public constant CHAIN_A_QUOTER =
        0xE6f867E993832E0432baCD4069529D0c76f5f274; // Uniswap V3 QuoterV2 on Ethereum Mainnet
    address public constant CHAIN_A_WETH =
        0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2; // WETH on Ethereum Mainnet
    address public constant CHAIN_A_USDC =
        0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48; // USDC on Ethereum Mainnet
    uint24 public constant CHAIN_A_FEE = 3000; // 0.3% pool fee
    uint256 public constant FILL_DEADLINE_BUFFER = 18000;


    /**
     * @notice Constructor to initialize the UniswapQuoteDemo contract with hardcoded chain configurations.
     * @param _endpoint The LayerZero endpoint contract address.
     * @param _readChannel The LayerZero read channel ID.
     */
    constructor(
        address _endpoint,
        uint32 _readChannel
    ) OAppRead(_endpoint, msg.sender) Ownable(msg.sender) {
        // Initialize Chain A Configuration (Ethereum Mainnet)
        ChainConfig memory chainAConfig = ChainConfig({
            confirmations: 1,
            quoterAddress: CHAIN_A_QUOTER,
            tokenInAddress: CHAIN_A_WETH,
            tokenOutAddress: CHAIN_A_USDC,
            fee: CHAIN_A_FEE
        });

        // Set Chain A Configuration
        chainConfigs[CHAIN_A_EID] = chainAConfig;
        targetEids.push(CHAIN_A_EID);

        // Set the read channel
        READ_CHANNEL = _readChannel;
        _setPeer(READ_CHANNEL, AddressCast.toBytes32(address(this)));

    }

    // ===========================
    // ======= FUNCTIONS =========
    // ===========================

    /**
     * @notice Sets the LayerZero read channel, enabling or disabling it based on `_active`.
     * @param _channelId The channel ID to set.
     * @param _active Flag to activate or deactivate the channel.
     */
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

    /**
     * @notice Sends a read request to LayerZero, querying Uniswap QuoterV2 for WETH/USDC prices on configured chains.
     * @param _extraOptions Additional messaging options, including gas and fee settings.
     * @return receipt The LayerZero messaging receipt for the request.
     */
    function readMockModule(
        bytes calldata _extraOptions
    ) external payable returns (MessagingReceipt memory receipt) {
        bytes memory cmd = getCmd();
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
        bytes calldata _extraOptions,
        bool _payInLzToken
    ) external view returns (MessagingFee memory fee) {
        bytes memory cmd = getCmd();
        return
            _quote(
                READ_CHANNEL,
                cmd,
                combineOptions(READ_CHANNEL, READ_MSG_TYPE, _extraOptions),
                _payInLzToken
            );
    }

    /**
     * @notice Constructs a command to query the Uniswap QuoterV2 for WETH/USDC prices on all configured chains.
     * @return cmd The encoded command to request Uniswap quotes.
     */
    function getCmd() public view returns (bytes memory) {
        uint256 pairCount = targetEids.length;
        EVMCallRequestV1[] memory readRequests = new EVMCallRequestV1[](
            pairCount
        );

        for (uint256 i = 0; i < pairCount; i++) {
            uint32 targetEid = targetEids[i];
            ChainConfig memory config = chainConfigs[targetEid];

            bytes memory callData = abi.encodeWithSelector(
                ChainAbstractionModule.getOrder.selector,
                2,
                40161
            );

            readRequests[i] = EVMCallRequestV1({
                appRequestLabel: uint16(i + 1),
                targetEid: targetEid,
                isBlockNum: false,
                blockNumOrTimestamp: uint64(block.timestamp),
                confirmations: config.confirmations,
                to: config.quoterAddress,
                callData: callData
            });
        }

        EVMCallComputeV1 memory computeSettings = EVMCallComputeV1({
            computeSetting: 3, // lzMap() and lzReduce()
            targetEid: ILayerZeroEndpointV2(endpoint).eid(),
            isBlockNum: false,
            blockNumOrTimestamp: uint64(block.timestamp),
            confirmations: 1,
            to: address(this)
        });

        return ReadCodecV1.encode(0, readRequests, computeSettings);
    }



   function _lzReceive(
        Origin calldata,
        bytes32 /*_guid*/,
        bytes calldata _message,
        address,
        bytes calldata
    ) internal override {
        (
            Order memory order,address account
        ) = abi.decode(
                _message,
                (Order, address)
            );
        emit OrderSettled(order.tokenIn, order.tokenOut, order.amount, order.eid, order.chainId, account);
    }
  
    

    /// @notice Allows the contract to receive Ether.
    receive() external payable {}
}
