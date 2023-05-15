import {HardhatRuntimeEnvironment} from "hardhat/types";
import {DeployFunction} from "hardhat-deploy/types";

const gatewayTokenContract = "0xF65b6396dF6B7e2D8a6270E3AB6c7BB08BAEF22E";
const gatekeeperNetworkIndex = 10;

const func: DeployFunction = async function ({getNamedAccounts, deployments}: HardhatRuntimeEnvironment) {
  const {deploy} = deployments;
  const {deployer} = await getNamedAccounts();
  await deploy('Lottery', {
    from: deployer,
    args: [gatewayTokenContract, gatekeeperNetworkIndex],
    log: true,
  });
};
export default func;
func.tags = ['Lottery'];