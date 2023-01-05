/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

// const HDWalletProvider = require('@truffle/hdwallet-provider');
// const infuraKey = "fj4jll3k.....";
//
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const HDWalletProviderKlaytn = require("truffle-hdwallet-provider-klaytn");
const pk = require('../pk.json')

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */
  contracts_build_directory: "./src/artifacts",
  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 8545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
     gasLimit: 6721975
     // ganache-cli -m "clutch captain shoe salt awake harvest setup primary inmate ugly among become" -u 0xa0df350d2637096571F7A701CBc1C5fdE30dF76A --db ../ganache  -p 8555 -e 1000
    },
    // Another network with more advanced options...
    // advanced: {
    // port: 8777,             // Custom port
    // network_id: 1342,       // Custom network
    // gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
    // gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
    // from: <address>,        // Account to send txs from (default: accounts[0])
    // websocket: true        // Enable EventEmitter interface for web3 (default: false)
    // },
    // Useful for deploying to a public network.
    // NB: It's important to wrap the provider as a function.
    // ropsten: {
    // provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/YOUR-PROJECT-ID`),
    // network_id: 3,       // Ropsten's id
    // gas: 5500000,        // Ropsten has a lower block limit than mainnet
    // confirmations: 2,    // # of confs to wait between deployments. (default: 0)
    // timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
    // skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    // },
    // Useful for private networks
    // private: {
    // provider: () => new HDWalletProvider(mnemonic, `https://network.io`),
    // network_id: 2111,   // This network is yours, in the cloud.
    // production: true    // Treats this network as if it was a public net. (default: false)
    // }
     
    mumbai: {
      provider: () => new HDWalletProvider({
          privateKeys: ["622306b68d3ad3e9c73a2f847f50f97caf1eb611ac2047624959663837c4e9bd"], 
          // 0x132e2c063960e14eE62EC2dAC6AbA6bA4BB68552
          providerOrUrl: `https://polygon-mumbai.infura.io/v3/e48719b96ea6487b974b72a871e5aa48`}),
          network_id: 80001
      // https://ropsten.infura.io/v3/753a98a2eb6c4d64918829f47d069440", // Endpoint of an node to connect to. Can be on localhost or on the internet
      },
    pl: {  provider: () => new HDWalletProvider({ //poligon local fork
        privateKeys: [`b8c1b5c1d81f9475fdf2e334517d29f733bdfa40682207571b12fc1142cbf329`],
        providerOrUrl: `http://localhost:8545`,
        gasPrice:30e9

        // https://ropsten.infura.io/v3/3362483b5eab409ea69e99f99aefd67a", // Endpoint of an node to connect to. Can be on localhost or on the internet
        // https://ropsten.infura.io/v3/753a98a2eb6c4d64918829f47d069440", // Endpoint of an node to connect to. Can be on localhost or on the internet
      }),
      network_id: "*",       // Ropsten's id
     // gas: 5500000,        // Ropsten has a lower block limit than mainnet
      //confirmations: 1,    // # of confs to wait between deployments. (default: 0)
      //timeoutBlocks: 5000,  // # of blocks before a deployment times out  (minimum/default: 50)
     // skipDryRun: false     // Skip dry run before migrations? (default: false for public nets ) }, 
      // fork from Polygon mainnet, needs start ganache as
  // rm -r ../ganache_poly && ganache-cli -m "clutch captain shoe salt awake harvest setup primary inmate ugly among become" -f 'https://polygon-mainnet.infura.io/v3/3362483b5eab409ea69e99f99aefd67a' -u 0xa0df350d2637096571F7A701CBc1C5fdE30dF76A --db ../ganache_poly  -p 8545 -g 20 -e 1000 -i 1337
  
    },

    bscl: {  provider: () => new HDWalletProvider({ //BSC local fork
      privateKeys: [`b8c1b5c1d81f9475fdf2e334517d29f733bdfa40682207571b12fc1142cbf329`],
      providerOrUrl: `http://localhost:8555`,
    }),
    network_id: 56,       // Ropsten's id
   // gas: 5500000,        // Ropsten has a lower block limit than mainnet
    //confirmations: 1,    // # of confs to wait between deployments. (default: 0)
    //timeoutBlocks: 5000,  // # of blocks before a deployment times out  (minimum/default: 50)
   // skipDryRun: false     // Skip dry run before migrations? (default: false for public nets ) }, 
    // fork from Polygon mainnet, needs start ganache as
// rm -r ../ganache_BSC && 
// ganache-cli -m "clutch captain shoe salt awake harvest setup primary inmate ugly among become" -f 'https://bsc-dataseed.binance.org/' -u 0xa0df350d2637096571F7A701CBc1C5fdE30dF76A --db ../ganache_BSC  -p 8555 -e 1000

  },
  bsctestnet: {  provider: () => new HDWalletProvider({ //BSC local fork
      privateKeys: [`622306b68d3ad3e9c73a2f847f50f97caf1eb611ac2047624959663837c4e9bd`],
      providerOrUrl: `https://data-seed-prebsc-1-s1.binance.org:8545/`,
    }),
    network_id: 97,       
    
  // gas: 5500000,        // Ropsten has a lower block limit than mainnet
    //confirmations: 1,    // # of confs to wait between deployments. (default: 0)
    //timeoutBlocks: 5000,  // # of blocks before a deployment times out  (minimum/default: 50)
  // skipDryRun: false     // Skip dry run before migrations? (default: false for public nets ) }, 
    // fork from Polygon mainnet, needs start ganache as
  // rm -r ../ganache_BSC && 
  // ganache-cli -m "clutch captain shoe salt awake harvest setup primary inmate ugly among become" -f https://api.s0.b.hmny.io -u 0xa0df350d2637096571F7A701CBc1C5fdE30dF76A --db ../ganache_HRM  -p 8545 -e 1000

  },
  celoforno: {  provider: () => new HDWalletProvider({ //Celo Forno
    privateKeys: [pk["42220"]], //0x11fEc6735eDc07270d9412cb7708776EB0b847FC
    providerOrUrl: `https://forno.celo.org/`,
  }),
  network_id: 42220,
  gas: 4000000
  },

  polygon: {  provider: () => new HDWalletProvider({ //Celo Forno
      privateKeys: [pk["137"]],
      providerOrUrl: `https://polygon-rpc.com/`, /* https://polygon-mainnet.infura.io/v3/3362483b5eab409ea69e99f99aefd67a */
    }),
    network_id: 137,
    gas: 10000000,
    networkCheckTimeout: 6000,
    gasPrice: 40000000000
  },

  moonriver: {  provider: () => new HDWalletProvider({ //Celo Forno
      privateKeys: [pk["1285"]],
      providerOrUrl: `https://rpc.api.moonriver.moonbeam.network`, /* https://polygon-mainnet.infura.io/v3/3362483b5eab409ea69e99f99aefd67a */
    }),
    network_id: 1285,
  //  gas: 15000000,
    networkCheckTimeout: 38000,
//    gasPrice: 20000000000
    },
    harmony: {  provider: () => new HDWalletProvider({ //Celo Forno
      privateKeys: [pk["137"]],
      providerOrUrl: 'https://api.s0.t.hmny.io', 
      // providerOrUrl: 'https://harmony-0-rpc.gateway.pokt.network',
      /////providerOrUrl: 'https://harmony.public-rpc.com',
     ///  providerOrUrl: 'https://harmony-mainnet.chainstacklabs.com', // https://api.s0.t.hmny.io for mainnet,TEST https://api.s0.b.hmny.io'
      derivationPath: `m/44'/1023'/0'/0/`,
    }),
    network_id: 1666600000, // 1666600000 for mainnet , 1666700000 TEST
    networkCheckTimeout: 180000,

    // gas: 80000000,
    // networkCheckTimeout: 38000,
    // gasPrice: 20000000000
    },
    
    aurora: {  provider: () => new HDWalletProvider({ //Aurora Near 
      privateKeys: [pk["137"]],
      providerOrUrl: 'https://mainnet.aurora.dev',  
     // testnet 	https://testnet.aurora.dev
     /**
      *   "0x4e454152":{
    "chainName": "Aurora Near",
    "rpcUrls": [
      "https://api.s0.t.hmny.io"
    ],
      */
      derivationPath: `m/44'/1023'/0'/0/`,
    }),
    network_id: 1313161554, // 1313161554 for mainnet , 1313161555 TEST
    networkCheckTimeout: 180000,

    // gas: 80000000,
    // networkCheckTimeout: 38000,
    // gasPrice: 20000000000
    },
    heco: {  provider: () => new HDWalletProvider({ //Aurora Near 
      privateKeys: [pk["137"]],
      providerOrUrl: 'https://http-mainnet.hecochain.com',  
     // testnet 	https://http-testnet.hecochain.com

      derivationPath: `m/44'/1023'/0'/0/`,
    }),
    network_id: "128", // 128 for mainnet , 256 TEST
    networkCheckTimeout: 180000,

    // gas: 80000000,
    // networkCheckTimeout: 38000,
    // gasPrice: 20000000000
    // ganache-cli -m "clutch captain shoe salt awake harvest setup primary inmate ugly among become" -f https://http-mainnet.hecochain.com -u 0xa0df350d2637096571F7A701CBc1C5fdE30dF76A --db ../ganache_HECO  -p 8545 -e 1000
    },
    trustevm: {
      provider: () => new HDWalletProvider({ //Aurora Near 
        privateKeys: ["622306b68d3ad3e9c73a2f847f50f97caf1eb611ac2047624959663837c4e9bd"], 
        // JUST FOR TESTNETS!!! 0x132e2c063960e14eE62EC2dAC6AbA6bA4BB68552
         providerOrUrl: 'https://api.testnet-dev.trust.one',  
  
        derivationPath: `m/44'/1023'/0'/0/`,
      }),
      port: 8545,
      network_id: "15555"
    },
    cypress: {
      provider: () => {
        return new HDWalletProviderKlaytn([pk["137"]], 
          /* "https://public-node-api.klaytnapi.com/v1/cypress" */
          'https://klaytn01.fandom.finance/'
        );
      },
      network_id: "8217", //Klaytn mainnet's network id
      gas: "8500000",
      gasPrice: null,
    },

    baobab: {
      provider: () => {
        return new HDWalletProviderKlaytn(["0xb8c1b5c1d81f9475fdf2e334517d29f733bdfa40682207571b12fc1142cbf329"], "https://api.baobab.klaytn.net:8651");
      },
      network_id: "1001", //Klaytn baobab testnet's network id
      gas: "8500000",
      gasPrice: null,
    },

  },
  

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
       version: "0.8.14",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
       settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200
        },
      //  evmVersion: "byzantium"
       }
    }
  }
};
