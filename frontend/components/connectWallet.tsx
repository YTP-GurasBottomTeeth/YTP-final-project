'use client'

import { getProvider } from "@/lib/connectProvider";
import type { ReactUseRef } from "@/lib/type";
import { BrowserProvider, Signer, AbstractProvider } from "ethers";
import { useState } from "react";

type ComponentAttr = { 
  provider: ReactUseRef<BrowserProvider | AbstractProvider>,
  signer: ReactUseRef<Signer>
}

export default function ConnetWallet({ provider, signer }: ComponentAttr) {
  const [status, setStatus] = useState(false)
  const onClick = async () => {
    provider.current = getProvider()
    if(provider.current instanceof BrowserProvider) {
      signer.current = await provider.current.getSigner()
      setStatus(true)
    }
  }

  return (
    <>
      <div>
        <button onClick={onClick}>{'Connect Wallect'}</button>
      </div>
      <div>
        <span>{'Wallet Status: '}</span>
        <span>{status ? "Connected" : "Not Connected"}</span>
      </div>
    </>
  )
}

