import { Signer } from "ethers";
import { AbstractProvider } from "ethers";
import { Contract } from "ethers";
import { BrowserProvider } from "ethers";
import { contractAbi, contractAddress } from "./contractInfo";

function connectContract(owner: Signer | BrowserProvider | AbstractProvider) {
  const contract = new Contract(contractAddress, contractAbi, owner)
  return contract
}

export { connectContract }