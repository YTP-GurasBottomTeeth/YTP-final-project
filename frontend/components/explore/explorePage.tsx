'use client'

import { useRef } from "react"
import ConnetWallet from "../connectWallet"
import { AbstractProvider, BrowserProvider, Signer } from "ethers"
import ConnectContract from "../connectContract"
import { Contract } from "ethers"
import AddAccount from "./func/addAccount"
import GetBalance from "./func/getBalance"
import GetLevel from "./func/getLevel"
import GetURLs from "./func/getURLs"
import ManagerUpload from "./func/managerUpload"
import Upload from "./func/upload"
import Verify from "./func/verify"
import Vote from "./func/vote"
import Withdraw from "./func/withdraw"
import WithdrawAll from "./func/withdrawAll"
import Deposit from "./func/deposit"

export default function ExplorePage() {
  const provider = useRef<BrowserProvider | AbstractProvider | null>(null)
  const signer = useRef<Signer | null>(null)
  const contract = useRef<Contract | null>(null)

  return (
    <>
      <div className="m-3">
        <div>
          <ConnetWallet provider={provider} signer={signer}/>
          <ConnectContract contract={contract} signer={signer} />
        </div>
        <div>
          <br />
          <Deposit signer={signer} contract={contract} />
          <br />
          <AddAccount signer={signer} contract={contract} />
          <br />
          <GetBalance signer={signer} contract={contract} />
          <br />
          <GetLevel signer={signer} contract={contract} />
          <br />
          <GetURLs signer={signer} contract={contract} />
          <br />
          <ManagerUpload signer={signer} contract={contract} />
          <br />
          <Upload signer={signer} contract={contract} />
          <br />
          <Verify signer={signer} contract={contract} />
          <br />
          <Vote signer={signer} contract={contract} />
          <br />
          <Withdraw signer={signer} contract={contract} />
          <br />
          <WithdrawAll signer={signer} contract={contract} />
          <br />
        </div>
      </div>
    </>
  )
}