import { task, HardhatUserConfig, configVariable } from "hardhat/config";

import hardhatToolboxMochaEthersPlugin from "@nomicfoundation/hardhat-toolbox-mocha-ethers";

import 'dotenv/config';


const config: HardhatUserConfig = {
  plugins: [hardhatToolboxMochaEthersPlugin],
  solidity: {
    profiles: {
      default: {
        version: "0.8.30",
      },
      production: {
        version: "0.8.30",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    },
  },
  networks: {
    hardhatMainnet: {
      type: "edr-simulated",
      chainType: "l1",
    },
    hardhatOp: {
      type: "edr-simulated",
      chainType: "op",
    },
    sepolia: {
      type: "http",
      chainType: "l1",
      url: configVariable("SEPOLIA_RPC_URL"),
      accounts: [configVariable("SEPOLIA_PRIVATE_KEY")],
    },
    localMetaMask: {
      type: "http",
      chainId: 31337,
      url: "http://127.0.0.1:8545",
      accounts: [
        process.env.HARDHAT_ACCOUNT_PRIVATE_KEY,
        process.env.HARDHAT_ACCOUNT_PRIVATE_KEY_2,
        process.env.HARDHAT_ACCOUNT_PRIVATE_KEY_3
      ],
    }
  },
};

export default config;
