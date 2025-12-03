import { network } from "hardhat";

const { ethers } = await network.connect();


async function main() {
  const new_contract = await ethers.getContractFactory("StorageMapping");
  const deployed_contract = await new_contract.deploy();
  await deployed_contract.waitForDeployment();
  console.log("Contract StorageMapping was deployed by address:", await deployed_contract.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
