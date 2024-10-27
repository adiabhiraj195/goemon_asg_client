export const GOEMON_CONTRACT_ADDRESS = "0x8c5F9516C23088d5F5E7F91B3327A93D9c7f3a93"

export const GOEMON_ABI = [
    {
        "type": "constructor",
        "inputs": [
            {
                "name": "permit2Address",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "cancelIntent",
        "inputs": [
            { "name": "_intentIndex", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "checkAndExecute",
        "inputs": [
            { "name": "_user", "type": "address", "internalType": "address" },
            {
                "name": "_intentIndex",
                "type": "uint256",
                "internalType": "uint256"
            },
            { "name": "_nonce", "type": "uint256", "internalType": "uint256" },
            { "name": "_deadline", "type": "uint256", "internalType": "uint256" },
            { "name": "_signature", "type": "bytes", "internalType": "bytes" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "createIntent",
        "inputs": [
            { "name": "_token", "type": "address", "internalType": "address" },
            { "name": "_recipient", "type": "address", "internalType": "address" },
            { "name": "_amount", "type": "uint256", "internalType": "uint256" },
            { "name": "_frequency", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "executeIntent",
        "inputs": [
            { "name": "_user", "type": "address", "internalType": "address" },
            { "name": "_intentIndex", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "executeIntentWithPermit",
        "inputs": [
            { "name": "_user", "type": "address", "internalType": "address" },
            {
                "name": "_intentIndex",
                "type": "uint256",
                "internalType": "uint256"
            },
            { "name": "_nonce", "type": "uint256", "internalType": "uint256" },
            { "name": "_deadline", "type": "uint256", "internalType": "uint256" },
            { "name": "_signature", "type": "bytes", "internalType": "bytes" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "permit2",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "contract ISignatureTransfer"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "transferWithPermit",
        "inputs": [
            { "name": "token", "type": "address", "internalType": "address" },
            { "name": "receiver", "type": "address", "internalType": "address" },
            { "name": "amount", "type": "uint256", "internalType": "uint256" },
            { "name": "nonce", "type": "uint256", "internalType": "uint256" },
            { "name": "deadline", "type": "uint256", "internalType": "uint256" },
            { "name": "sig", "type": "bytes", "internalType": "bytes" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "userIntents",
        "inputs": [
            { "name": "", "type": "address", "internalType": "address" },
            { "name": "", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [
            { "name": "token", "type": "address", "internalType": "address" },
            { "name": "recipient", "type": "address", "internalType": "address" },
            { "name": "amount", "type": "uint256", "internalType": "uint256" },
            { "name": "frequency", "type": "uint256", "internalType": "uint256" },
            {
                "name": "nextExecution",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "event",
        "name": "IntentCanceled",
        "inputs": [
            {
                "name": "user",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "intentIndex",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "IntentCreated",
        "inputs": [
            {
                "name": "user",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "intentIndex",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "recipient",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "amount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "frequency",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "IntentExecuted",
        "inputs": [
            {
                "name": "user",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "intentIndex",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "PermitTransfer",
        "inputs": [
            {
                "name": "token",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "owner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "receiver",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "amount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    }
]