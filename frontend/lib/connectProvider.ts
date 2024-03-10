import { ethers } from "ethers";

export function getProvider() {
  let provider = null

  if(typeof window === 'undefined') {
    provider = ethers.getDefaultProvider()
  } else if(window.ethereum === undefined) {
    // MetaMask not installed. Using read-only defaults.
    provider = ethers.getDefaultProvider();
  } else {
    provider = new ethers.BrowserProvider(window.ethereum)
  }

  return provider
}