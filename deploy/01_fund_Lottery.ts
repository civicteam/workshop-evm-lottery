import {HardhatRuntimeEnvironment} from "hardhat/types";
import {DeployFunction} from "hardhat-deploy/types";

const func: DeployFunction = async function ({getNamedAccounts, deployments, ethers}: HardhatRuntimeEnvironment) {
  const {getContract} = ethers;
  const {deployer} = await getNamedAccounts();
  const deployerSigner = await ethers.getSigner(deployer);
  const lottery = await getContract('Lottery');
  const fundingTx = {
    to: lottery.address,
    value: ethers.utils.parseEther('0.1')
};
  const transaction = await (await deployerSigner.sendTransaction(fundingTx)).wait();
  console.log("Sent 0.1 MATIC to Lottery contract. Transaction hash: ", transaction.transactionHash);
};
export default func;
func.tags = ['Lottery'];