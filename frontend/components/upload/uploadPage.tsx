'use client'

import { BrowserProvider, AbstractProvider, Signer, Contract } from "ethers"
import { useRef } from "react"
import ConnetWallet from "../lib/connectWallet"
import ConnectContract from "../lib/connectContract"
import { callFunction } from "@/lib/callFunction"
import { useRouter } from "next/navigation"
import Upload from "./upload"
import ManagerUpload from "./managerUpload"
import BalanceViewer from "../lib/balanceViewer"

export default async function UploadPage() {
  const provider = useRef<BrowserProvider | AbstractProvider | null>(null)
  const signer = useRef<Signer | null>(null)
  const contract = useRef<Contract | null>(null)
  const router = useRouter()

  if(!contract.current) {
    router.push('/internal-error')
    return
  }

  const [isManager] = await callFunction(contract.current, 'isManager', [])

  return (
    <>
      <div>
        <ConnetWallet provider={provider} signer={signer} />
        <ConnectContract contract={contract} signer={signer} />
      </div>
      <div>
        <BalanceViewer contract={contract} />
        { isManager ? <ManagerUpload contract={contract} /> : <Upload contract={contract} /> }
      </div>
    </>
  )
}