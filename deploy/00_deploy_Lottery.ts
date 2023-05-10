import {HardhatRuntimeEnvironment} from "hardhat/types";
import {DeployFunction} from "hardhat-deploy/types";
import * as fs from "fs";

const func: DeployFunction = async function ({getNamedAccounts, deployments}: HardhatRuntimeEnvironment) {
  const {deploy} = deployments;
  const {deployer} = await getNamedAccounts();
  await deploy('Lottery', {
    from: deployer,
    args: [],
    log: true,
  });
};
export default func;
func.tags = ['Lottery'];