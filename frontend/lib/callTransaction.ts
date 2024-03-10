import { Contract } from "ethers";

async function callTransaction(contract: Contract, funcName: string, args: any[]): Promise<any[]> {
  try {
    const res = await contract[funcName](...args)
    const rec = await res.wait(1)
    if(rec.logs[0])
      return rec.logs[0].args
    return [null]
  } catch(err: any) {
    if(err.reason === undefined)
      throw err
    throw err.reason
  }
}

export { callTransaction }