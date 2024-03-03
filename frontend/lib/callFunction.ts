import { Contract } from "ethers"

async function callFunction(contract: Contract, funcName: string, args: any[]): Promise<any[]> {
  try {
    const res = await contract[funcName](...args)
    if(!Array.isArray(res)) {
      return [res]
    } else {
      return res
    }
  } catch(err: any) {
    throw err.reason
  }
}

export { callFunction }