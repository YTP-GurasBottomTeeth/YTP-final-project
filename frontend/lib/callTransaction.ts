import { error } from "console";
import { Contract } from "ethers";

async function callTransaction(contract: Contract, funcName: string, args: any[]): Promise<any[]> {
  try {
    const res = await contract[funcName](...args)
    const rec = await res.wait(1)
    return rec.logs[0].args
  } catch(err: any) {
    throw err.reason
  }
}

export { callTransaction }