import { ethers } from "hardhat";

async function main() {
  const lockedAmount = ethers.parseEther("0.001");

  const news = await ethers.deployContract("myContract", [], {
    value: lockedAmount,
  });

  await news.waitForDeployment();

  console.log(
    `Lock with ${ethers.formatEther(
      lockedAmount
    )} deployed to ${news.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
