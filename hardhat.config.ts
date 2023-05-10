import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import '@nomiclabs/hardhat-ethers';
import 'hardhat-deploy';

const accounts = process.env.PRIVATE_KEY ?  [process.env.PRIVATE_KEY]:[];

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  typechain: {
    outDir: "app/src/typechain-types",
  },
  networks: {
    mainnet: {
      url: 'https://erpc.xinfin.network',
      saveDeployments: true,
      accounts,
      chainId: 50,
    },
    testnet: {
      url: 'https://erpc.apothem.network',
      saveDeployments: true,
      accounts,
      chainId: 51,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0
    }
  }
};

export default config;
