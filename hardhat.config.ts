/**
 * @type import('hardhat/config').HardhatUserConfig
 */

import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-solhint";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "dotenv/config";
import { ethers } from "ethers";
import "hardhat-abi-exporter";
import "hardhat-deploy";
import "solidity-coverage";

// import "hardhat-watcher";
import { Network } from "./src/contracts/Network";
import { providers } from "./src/contracts/providers";
import "./src/HardhatRegistryExtension";
import "./tasks/accounts";
import "./tasks/balance";
import "./tasks/block-number";

const FTMSCAN_API_KEY = process.env.FTMSCAN_API_KEY as string;
const DEPLOYER_SECRET_KEY = process.env.DEPLOYER_SECRET_KEY as string;
const DAO_ADDRESS = process.env.DAO_ADDRESS as string;


module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            // If you want to do some forking, uncomment this
            forking: {
                url: providers.getUrl(Network.OPERA_MAIN_NET),
            },
        },
        localhost: {},
        ganache: {
            url: "http://localhost:7545",
            accounts: [DEPLOYER_SECRET_KEY],
            chainId: 1337,
            gas: 'auto',
        },
        ftm_testnet: {
            url: providers.getUrl(Network.OPERA_TEST_NET),
            chainId: Network.OPERA_TEST_NET,
            accounts: [DEPLOYER_SECRET_KEY],
            tags: ["test"],
            // gas: "auto"
        },
        ftm_mainnet: {
            url: providers.getUrl(Network.OPERA_MAIN_NET),
            chainId: Network.OPERA_MAIN_NET,
            accounts: [DEPLOYER_SECRET_KEY],
            tags: ["main"],
        },
        fujiAvalanche: {
            chainId: 43113,
            url: "https://api.avax-test.network/ext/bc/C/rpc",
            accounts: [DEPLOYER_SECRET_KEY],
            // gasPrice: 225000000000,
            timeout: 1000000
        },
        mainnetAvalanche: {
            chainId: 43114,
            url: "https://api.avax.network/ext/bc/C/rpc",
            accounts: [DEPLOYER_SECRET_KEY],
            //gasPrice: 225000000000,
        },
        rinkeby:
        {
            // url: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
            url: "https://rinkeby.infura.io/v3/80cf9755b2474adf971635b3300fe785",
            chainId: 4,
            accounts: [DEPLOYER_SECRET_KEY],
            timeout: 100000000,
        },
        bsc_testnet:
        {
            url: "https://data-seed-prebsc-2-s3.binance.org:8545",
            chainId: 97,
            accounts: [DEPLOYER_SECRET_KEY],
            timeout: 100000000,
        },



    },
    etherscan: {
        // Your API key for Etherscan
        // Obtain one at https://etherscan.io/
        apiKey: FTMSCAN_API_KEY,
    },
    namedAccounts: {
        deployer: {
            default: 4, // here this will by default take the first account as deployer
            [Network.OPERA_MAIN_NET]: ethers.utils.computeAddress(DEPLOYER_SECRET_KEY),
            [Network.OPERA_TEST_NET]: ethers.utils.computeAddress(DEPLOYER_SECRET_KEY),
            [Network.GANACHE]: ethers.utils.computeAddress(DEPLOYER_SECRET_KEY),
            [Network.HARDHAT]: ethers.utils.computeAddress(DEPLOYER_SECRET_KEY),
            [Network.FUJI_AVALANCHE]: ethers.utils.computeAddress(DEPLOYER_SECRET_KEY),
            [Network.RINKEBY]: ethers.utils.computeAddress(DEPLOYER_SECRET_KEY),
            [Network.BSC_TESTNET]: ethers.utils.computeAddress(DEPLOYER_SECRET_KEY),



        },
        DAO: {
            default: 4,
            [Network.OPERA_MAIN_NET]: "0xC4e0cbe134c48085e8FF72eb31f0Ebca29b152ee",
            [Network.OPERA_TEST_NET]: DAO_ADDRESS,
            [Network.GANACHE]: DAO_ADDRESS,
            [Network.HARDHAT]: DAO_ADDRESS,
            [Network.FUJI_AVALANCHE]: DAO_ADDRESS,
            [Network.RINKEBY]: DAO_ADDRESS,
            [Network.BSC_TESTNET]: DAO_ADDRESS,
        },
    },
    typechain: {
        externalArtifacts: ["./node_modules/@hovoh/spookyswap-core/build/*.json"],
    },
    solidity: {
        compilers: [
            {
                version: "0.7.5",
            },
            {
                version: "0.8.0",
            },
        ],
        outputSelection: {
            "*": {
                "*": ["storageLayout"],
            },
        },
    },
    mocha: {
        timeout: 100000,
    },
};
