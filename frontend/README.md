# Frontend

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Install Dependencies
You MUST install dependencies although you have run it in the parent directory.
(It's DIFFERENT!!!)
```
npm install
```

## Reference

### `@/lib/type.ts`
```ts
type ReactUseState<S> = Dispatch<SetStateAction<S | null>>
type ReactUseRef<S> = MutableRefObject<S | null>
```

### `@/components/connectWallet.tsx`
#### `<ConnectWallet provider={} signer={} />`
- provider: `ReactUseRef<BrowserProvider | AbstractProvider>`
- signer: `ReactUseRef<Signer>`

Example
```tsx
import ConnetWallet from "@/components/connectWallet"

function component() {
  const provider = useRef<BrowserProvider | AbstractProvider | null>(null)
  const signer = useRef<Signer | null>(null)

  return (
    <>
      <ConnectWallet provider={provider} signer={signer} />
    </>
  )
}
```

### `@/lib/connectContract.ts`
#### `connectContract(owner: Signer | BrowserProvider | AbstractProvider)`
Function for connecting to contract. **If you only want to connect to the contract, use `<ConnectContract />` instead.**

Example
```ts
const contract = useRef<Contract | null>(null)
const isContractConnected = useRef<boolean>(false)

useEffect(() => {
  const interval = setInterval(() => {
    if(!isContractConnected.current) {
      if(signer.current) {
        contract.current = connectContract(signer.current)
      }
      isContractConnected.current = true
    }
  }, 1000)

  return () => {
    clearInterval(interval)
  }
}, [])
```

### `@/components/connectContract.tsx`
#### `<ConnectContract contract={} signer={} init={} />`
- contract: `ReactUseRef<Contract>`
- signer: `ReactUseRef<Signer>`
- init: `() => void`
  - The init function after contract constructed.

Example
```tsx
import ConnetContract from "@/components/connectContract"

function component() {
  const contract = useRef<Contract | null>(null)
  const signer = useRef<Signer | null>(null)

  return (
    <>
      <ConnectContract contract={contract} signer={signer} init={initFunc} />
    </>
  )
}
```

### `@/lib/callTransaction.ts`
#### `callTransaction(contract: Contract, funcName: string, args: any[]): Promise<any[]>`
A helper function for calling non view function from solidity.

```ts
try {
  const ret = await callTransaction(contract, 'upload', ['william', 'killer'])
  const [newsIdNumber] = ret

  console.log(await contract.current?.getURLs(newsIdNumber))
} catch(err) {
  console.log(err)
}
```

### `@/lib/contractInfo.ts`
#### `contractAddress`
The contract address. **May need to modify after deployment.**

#### `contractAbi`
The contract ABI.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
