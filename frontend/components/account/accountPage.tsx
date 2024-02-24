'use client'

import { AbstractProvider } from "ethers";
import { BrowserProvider } from "ethers";
import { Signer } from "ethers";
import AccountInfo from "@/components/account/accountInfo";
import { useRef } from "react";
import ConnetWallet from "@/components/connectWallet";

export default function AccountPage() {
  const provider = useRef<BrowserProvider | AbstractProvider | null>(null)
  const signer = useRef<Signer | null>(null)

  return (
    <>
      <ConnetWallet provider={provider} signer={signer} />
      <AccountInfo provider={provider} signer={signer} />
    </>
  )
}