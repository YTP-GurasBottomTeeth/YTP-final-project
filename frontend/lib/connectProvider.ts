import { ethers } from "ethers";

export function getProvider() {
  let provider = null

  if(typeof window === 'undefined') {
    provider = ethers.getDefaultProvider('http://localhost:8545/')
  } else if(window.ethereum === undefined) {
    // MetaMask not installed. Using read-only defaults.
    provider = ethers.getDefaultProvider('http://localhost:8545/');
  } else {
    provider = new ethers.BrowserProvider(window.ethereum)
  }

  return provider
}
