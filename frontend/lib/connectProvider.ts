import { ethers } from "ethers";

export function getProvider() {
  let provider = null

  if(window.ethereum == null) {
    // MetaMask not installed. Using read-only defaults.
    provider = ethers.getDefaultProvider();
  } else {
    provider = new ethers.BrowserProvider(window.ethereum)
  }

  return provider
}