'use client'

import { ReactUseRef } from "@/lib/type";
import { Contract } from "ethers";
import Input from "./Input";
import ErrMsg from "./errMsg";
import { useState } from "react";
import { callTransaction } from "@/lib/callTransaction";

export default function ManagerOnly({ login, contract }: { login: boolean, contract: ReactUseRef<Contract> }) {
  const [errMsg, setErrMsg] = useState<string>("")

  const onClick = async () => {
    if(!contract.current) return
    const doc = document.getElementById('addAccount')
    const addressInput = doc?.querySelector('#address')
    if(!(addressInput instanceof HTMLInputElement)) return
    const address = addressInput.value
    try {
      await callTransaction(contract.current, 'addAccount', [address])
    } catch(err: any) {
      setErrMsg(err.toString())
    }
  }

  return (
    <>
      <div id="addAccount" className="mt-10">
        <div className="block w-full my-2">
          <div className="inline-block w-[75%]">
            <Input label={'Account Address'} text="Address" id={'address'} disable={!login} />
          </div>
          <div className="inline-flex w-[25%] justify-end">
            <button className="border rounded p-2 px-3  bg-blue-500 text-white disabled:bg-gray-300 transition-colors duration-300 select-none" onClick={onClick} disabled={!login}>{"Add Account"}</button>
          </div>
          <ErrMsg msg={errMsg} />
        </div>
      </div>
    </>
  )
}