import type { HardhatUserConfig } from "hardhat/config";

import hardhatToolboxMochaEthersPlugin from "@nomicfoundation/hardhat-toolbox-mocha-ethers";
import { configVariable } from "hardhat/config";

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
      type: "edr-simulated",
      chainId: 31337,
      chainType: "l1",
      accounts: [
        {
          privateKey: process.env.HARDHAT_ACCOUNT_PRIVATE_KEY,
          balance: process.env.HARDHAT_ACCOUNT_BALANCE
        },
        {
          privateKey: process.env.HARDHAT_ACCOUNT_PRIVATE_KEY_2,
          balance: process.env.HARDHAT_ACCOUNT_BALANCE_2
        },
        {
          privateKey: process.env.HARDHAT_ACCOUNT_PRIVATE_KEY_3,
          balance: process.env.HARDHAT_ACCOUNT_BALANCE_3
        },
      ]
    }
  },
};

export default config;
