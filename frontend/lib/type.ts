import { Dispatch, MutableRefObject, SetStateAction } from "react";

type ReactUseState<S> = Dispatch<SetStateAction<S | null>>
type ReactUseRef<S> = MutableRefObject<S | null>

export type { ReactUseState, ReactUseRef }