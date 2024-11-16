export const BASE_SEPOLIA_MODULE = "0xfbd8b9b90c60525ca2e8f33b4e7c523b7abd516f" as `0x${string}`
export const SEPOLIA_MODULE = "0x464b830085d196174d4842d83491bb82458ecbe3" as `0x${string}`

export const MODULE_ABI = [
    {
      "type": "constructor",
      "inputs": [
        { "name": "_spokePool", "type": "address", "internalType": "address" },
        { "name": "_eid", "type": "uint32", "internalType": "uint32" },
        { "name": "_endpoint", "type": "address", "internalType": "address" },
        { "name": "_readChannel", "type": "uint32", "internalType": "uint32" },
        {
          "name": "_multicallHandler",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "FILL_DEADLINE_BUFFER",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "READ_CHANNEL",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint32", "internalType": "uint32" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "allowInitializePath",
      "inputs": [
        {
          "name": "origin",
          "type": "tuple",
          "internalType": "struct Origin",
          "components": [
            { "name": "srcEid", "type": "uint32", "internalType": "uint32" },
            { "name": "sender", "type": "bytes32", "internalType": "bytes32" },
            { "name": "nonce", "type": "uint64", "internalType": "uint64" }
          ]
        }
      ],
      "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "combineOptions",
      "inputs": [
        { "name": "_eid", "type": "uint32", "internalType": "uint32" },
        { "name": "_msgType", "type": "uint16", "internalType": "uint16" },
        { "name": "_extraOptions", "type": "bytes", "internalType": "bytes" }
      ],
      "outputs": [{ "name": "", "type": "bytes", "internalType": "bytes" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "createTransaction",
      "inputs": [
        { "name": "_to", "type": "address", "internalType": "address" },
        { "name": "_value", "type": "uint256", "internalType": "uint256" },
        { "name": "_data", "type": "bytes", "internalType": "bytes" },
        { "name": "account", "type": "address", "internalType": "address" },
        {
          "name": "_orders",
          "type": "tuple[]",
          "internalType": "struct Order[]",
          "components": [
            { "name": "tokenIn", "type": "address", "internalType": "address" },
            {
              "name": "tokenOut",
              "type": "address",
              "internalType": "address"
            },
            { "name": "amount", "type": "uint256", "internalType": "uint256" },
            { "name": "eid", "type": "uint32", "internalType": "uint32" },
            { "name": "chainId", "type": "uint32", "internalType": "uint32" }
          ]
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "crossChainModules",
      "inputs": [{ "name": "", "type": "uint32", "internalType": "uint32" }],
      "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "crosschainMessages",
      "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "outputs": [{ "name": "", "type": "bytes", "internalType": "bytes" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "eid",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint32", "internalType": "uint32" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "endpoint",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "contract ILayerZeroEndpointV2"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "enforcedOptions",
      "inputs": [
        { "name": "eid", "type": "uint32", "internalType": "uint32" },
        { "name": "msgType", "type": "uint16", "internalType": "uint16" }
      ],
      "outputs": [
        { "name": "enforcedOption", "type": "bytes", "internalType": "bytes" }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "fulfillTransaction",
      "inputs": [
        {
          "name": "_transactionId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "getCmd",
      "inputs": [
        {
          "name": "_transactionId",
          "type": "uint256",
          "internalType": "uint256"
        },
        { "name": "targetEid", "type": "uint32", "internalType": "uint32" }
      ],
      "outputs": [{ "name": "", "type": "bytes", "internalType": "bytes" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getOrder",
      "inputs": [
        {
          "name": "_transactionId",
          "type": "uint256",
          "internalType": "uint256"
        },
        { "name": "_eid", "type": "uint32", "internalType": "uint32" }
      ],
      "outputs": [
        { "name": "", "type": "address", "internalType": "address" },
        { "name": "", "type": "address", "internalType": "address" },
        { "name": "", "type": "address", "internalType": "address" },
        { "name": "", "type": "uint256", "internalType": "uint256" },
        { "name": "", "type": "uint256", "internalType": "uint256" },
        { "name": "", "type": "uint32", "internalType": "uint32" },
        { "name": "", "type": "uint32", "internalType": "uint32" }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getReadModuleQuote",
      "inputs": [
        { "name": "_payInLzToken", "type": "bool", "internalType": "bool" },
        {
          "name": "_transactionId",
          "type": "uint256",
          "internalType": "uint256"
        },
        { "name": "_targetEid", "type": "uint32", "internalType": "uint32" },
        { "name": "_extraOptions", "type": "bytes", "internalType": "bytes" }
      ],
      "outputs": [
        {
          "name": "fee",
          "type": "tuple",
          "internalType": "struct MessagingFee",
          "components": [
            {
              "name": "nativeFee",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "lzTokenFee",
              "type": "uint256",
              "internalType": "uint256"
            }
          ]
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "isComposeMsgSender",
      "inputs": [
        {
          "name": "",
          "type": "tuple",
          "internalType": "struct Origin",
          "components": [
            { "name": "srcEid", "type": "uint32", "internalType": "uint32" },
            { "name": "sender", "type": "bytes32", "internalType": "bytes32" },
            { "name": "nonce", "type": "uint64", "internalType": "uint64" }
          ]
        },
        { "name": "", "type": "bytes", "internalType": "bytes" },
        { "name": "_sender", "type": "address", "internalType": "address" }
      ],
      "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "lzReceive",
      "inputs": [
        {
          "name": "_origin",
          "type": "tuple",
          "internalType": "struct Origin",
          "components": [
            { "name": "srcEid", "type": "uint32", "internalType": "uint32" },
            { "name": "sender", "type": "bytes32", "internalType": "bytes32" },
            { "name": "nonce", "type": "uint64", "internalType": "uint64" }
          ]
        },
        { "name": "_guid", "type": "bytes32", "internalType": "bytes32" },
        { "name": "_message", "type": "bytes", "internalType": "bytes" },
        { "name": "_executor", "type": "address", "internalType": "address" },
        { "name": "_extraData", "type": "bytes", "internalType": "bytes" }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "multicallHandler",
      "inputs": [],
      "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "nextNonce",
      "inputs": [
        { "name": "", "type": "uint32", "internalType": "uint32" },
        { "name": "", "type": "bytes32", "internalType": "bytes32" }
      ],
      "outputs": [
        { "name": "nonce", "type": "uint64", "internalType": "uint64" }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "oAppVersion",
      "inputs": [],
      "outputs": [
        { "name": "senderVersion", "type": "uint64", "internalType": "uint64" },
        {
          "name": "receiverVersion",
          "type": "uint64",
          "internalType": "uint64"
        }
      ],
      "stateMutability": "pure"
    },
    {
      "type": "function",
      "name": "orderBook",
      "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "outputs": [
        { "name": "from", "type": "address", "internalType": "address" },
        { "name": "to", "type": "address", "internalType": "address" },
        { "name": "value", "type": "uint256", "internalType": "uint256" },
        { "name": "data", "type": "bytes", "internalType": "bytes" }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "owner",
      "inputs": [],
      "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "peers",
      "inputs": [{ "name": "eid", "type": "uint32", "internalType": "uint32" }],
      "outputs": [
        { "name": "peer", "type": "bytes32", "internalType": "bytes32" }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "readModule",
      "inputs": [
        {
          "name": "transactionId",
          "type": "uint256",
          "internalType": "uint256"
        },
        { "name": "targetEid", "type": "uint32", "internalType": "uint32" },
        { "name": "_extraOptions", "type": "bytes", "internalType": "bytes" },
        { "name": "message", "type": "bytes", "internalType": "bytes" }
      ],
      "outputs": [
        {
          "name": "receipt",
          "type": "tuple",
          "internalType": "struct MessagingReceipt",
          "components": [
            { "name": "guid", "type": "bytes32", "internalType": "bytes32" },
            { "name": "nonce", "type": "uint64", "internalType": "uint64" },
            {
              "name": "fee",
              "type": "tuple",
              "internalType": "struct MessagingFee",
              "components": [
                {
                  "name": "nativeFee",
                  "type": "uint256",
                  "internalType": "uint256"
                },
                {
                  "name": "lzTokenFee",
                  "type": "uint256",
                  "internalType": "uint256"
                }
              ]
            }
          ]
        }
      ],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "renounceOwnership",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setCrossChainModule",
      "inputs": [
        { "name": "_eid", "type": "uint32", "internalType": "uint32" },
        { "name": "_module", "type": "address", "internalType": "address" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setDelegate",
      "inputs": [
        { "name": "_delegate", "type": "address", "internalType": "address" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setEnforcedOptions",
      "inputs": [
        {
          "name": "_enforcedOptions",
          "type": "tuple[]",
          "internalType": "struct EnforcedOptionParam[]",
          "components": [
            { "name": "eid", "type": "uint32", "internalType": "uint32" },
            { "name": "msgType", "type": "uint16", "internalType": "uint16" },
            { "name": "options", "type": "bytes", "internalType": "bytes" }
          ]
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setPeer",
      "inputs": [
        { "name": "_eid", "type": "uint32", "internalType": "uint32" },
        { "name": "_peer", "type": "bytes32", "internalType": "bytes32" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setReadChannel",
      "inputs": [
        { "name": "_channelId", "type": "uint32", "internalType": "uint32" },
        { "name": "_active", "type": "bool", "internalType": "bool" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "spokePool",
      "inputs": [],
      "outputs": [
        { "name": "", "type": "address", "internalType": "contract ISpokePool" }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "transferOwnership",
      "inputs": [
        { "name": "newOwner", "type": "address", "internalType": "address" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "event",
      "name": "EnforcedOptionSet",
      "inputs": [
        {
          "name": "_enforcedOptions",
          "type": "tuple[]",
          "indexed": false,
          "internalType": "struct EnforcedOptionParam[]",
          "components": [
            { "name": "eid", "type": "uint32", "internalType": "uint32" },
            { "name": "msgType", "type": "uint16", "internalType": "uint16" },
            { "name": "options", "type": "bytes", "internalType": "bytes" }
          ]
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "OrderSettled",
      "inputs": [
        {
          "name": "tokenIn",
          "type": "address",
          "indexed": false,
          "internalType": "address"
        },
        {
          "name": "tokenOut",
          "type": "address",
          "indexed": false,
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "eid",
          "type": "uint32",
          "indexed": false,
          "internalType": "uint32"
        },
        {
          "name": "chainId",
          "type": "uint32",
          "indexed": false,
          "internalType": "uint32"
        },
        {
          "name": "account",
          "type": "address",
          "indexed": false,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "OwnershipTransferred",
      "inputs": [
        {
          "name": "previousOwner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "newOwner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "PeerSet",
      "inputs": [
        {
          "name": "eid",
          "type": "uint32",
          "indexed": false,
          "internalType": "uint32"
        },
        {
          "name": "peer",
          "type": "bytes32",
          "indexed": false,
          "internalType": "bytes32"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "TransactionCreated",
      "inputs": [
        {
          "name": "from",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "to",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "value",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "data",
          "type": "bytes",
          "indexed": false,
          "internalType": "bytes"
        },
        {
          "name": "id",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    { "type": "error", "name": "InvalidDelegate", "inputs": [] },
    { "type": "error", "name": "InvalidEndpointCall", "inputs": [] },
    {
      "type": "error",
      "name": "InvalidOptions",
      "inputs": [
        { "name": "options", "type": "bytes", "internalType": "bytes" }
      ]
    },
    { "type": "error", "name": "LzTokenUnavailable", "inputs": [] },
    {
      "type": "error",
      "name": "NoPeer",
      "inputs": [{ "name": "eid", "type": "uint32", "internalType": "uint32" }]
    },
    {
      "type": "error",
      "name": "NotEnoughNative",
      "inputs": [
        { "name": "msgValue", "type": "uint256", "internalType": "uint256" }
      ]
    },
    {
      "type": "error",
      "name": "OnlyEndpoint",
      "inputs": [
        { "name": "addr", "type": "address", "internalType": "address" }
      ]
    },
    {
      "type": "error",
      "name": "OnlyPeer",
      "inputs": [
        { "name": "eid", "type": "uint32", "internalType": "uint32" },
        { "name": "sender", "type": "bytes32", "internalType": "bytes32" }
      ]
    },
    {
      "type": "error",
      "name": "OwnableInvalidOwner",
      "inputs": [
        { "name": "owner", "type": "address", "internalType": "address" }
      ]
    },
    {
      "type": "error",
      "name": "OwnableUnauthorizedAccount",
      "inputs": [
        { "name": "account", "type": "address", "internalType": "address" }
      ]
    },
    {
      "type": "error",
      "name": "SafeCastOverflowedUintDowncast",
      "inputs": [
        { "name": "bits", "type": "uint8", "internalType": "uint8" },
        { "name": "value", "type": "uint256", "internalType": "uint256" }
      ]
    },
    {
      "type": "error",
      "name": "SafeERC20FailedOperation",
      "inputs": [
        { "name": "token", "type": "address", "internalType": "address" }
      ]
    }
  ]
