import { Contract } from "ethers";
import { BrowserProvider, AbstractProvider, Signer } from "ethers";
import { Dispatch, MutableRefObject, SetStateAction } from "react";

type ReactUseState<S> = Dispatch<SetStateAction<S | null>>
type ReactUseRef<S> = MutableRefObject<S | null>
type SolFuncComponentAttr = {
  signer: ReactUseRef<Signer>,
  contract: ReactUseRef<Contract>
}
export type { ReactUseState, ReactUseRef, SolFuncComponentAttr }