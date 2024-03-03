# YTP Final Project

## For Developers

### Install All Required Packages
Please run `npm install` in your terminal.

### Typescript
[LINK](https://hardhat.org/hardhat-runner/docs/guides/typescript)

### Next.js
1. [Creating layouts and pages](https://nextjs.org/learn/dashboard-app/creating-layouts-and-pages)
2. [Project Struture](https://www.youtube.com/watch?v=FmerxXWD66g&list=PLC3y8-rFHvwjOKd6gdf4QtV1uYNiQnruI&index=3)
3. [Routing](https://www.youtube.com/watch?v=Vm7qM1wmXwE&list=PLC3y8-rFHvwjOKd6gdf4QtV1uYNiQnruI&index=5)
4. [Private Folder](https://www.youtube.com/watch?v=nQKtuiccMLs&list=PLC3y8-rFHvwjOKd6gdf4QtV1uYNiQnruI&index=12)
5. [Layout](https://www.youtube.com/watch?v=f93g238p9tM&list=PLC3y8-rFHvwjOKd6gdf4QtV1uYNiQnruI&index=14)
6. [CSR (Client Side Rendering)](https://www.youtube.com/watch?v=OXrNQPhzH84&list=PLC3y8-rFHvwjOKd6gdf4QtV1uYNiQnruI&index=46)
7. [SSR (Server Side Rendering)](https://www.youtube.com/watch?v=3e017ih7pOA&list=PLC3y8-rFHvwjOKd6gdf4QtV1uYNiQnruI&index=47)
8. [Docs](https://nextjs.org/docs)
9. [`useRef` vs `useState`](https://medium.com/web-development-with-sumit/useref-vs-usestate-in-react-330539025245)
10. [`useEffect`](https://hackmd.io/@Heidi-Liu/note-fe302-hooks-useeffect)


### Start a Local Blockchain Network
```
npx hardhat node
```
#### Blockchain Accounts?
They will be printed in your terminal after starting local network.

### Compiling Smart Contract
```
npx hardhat compile
```

### Testing Smart Contract
1. [Run Tests](https://hardhat.org/tutorial/debugging-with-hardhat-network)
2. [Writing Tests 1](https://hardhat.org/hardhat-runner/docs/getting-started)
3. [Writing Tests 2](https://hardhat.org/hardhat-runner/docs/guides/tasks-and-scripts)
4. [Test Example from Our Demo Project](https://github.com/YTP-GurasBottomTeeth/ytp-demo/blob/master/test/election.js)

### Using Hardhat Console
```
npx hardhat console

> const contract = await ethers.getContractAt(contract_name, contract_address)
> contract.interface.fragments   //listing all functions and events
> await contract.[function or event name]()   //calling function or event
```

### Deploying Smart Contract

#### Live Network
[LINK](https://hardhat.org/tutorial/deploying-to-a-live-network)

#### Local Network
```
npx hardhat --network localhost run scripts/deploy.ts
```
Remember to start a local blockchain before deploying contracts.

### Testing
```
Manager: addAccount(A)
Manager: addAccount(B)
Manager: addAccount(C)

A transact(10 ether)
A upload(‘abc’, ‘def’) * 10

B vote(1 ~ 10, true)
C vote(1 ~ 5, true)

// B and C should get their first reward

C vote(6, true)

// B and C should get their second reward

C vote(7 ~ 8, false)

// B get reward, C doesn’t

C vote(9, true)

// C should not get reward


Manager: verify(1), verify(😎, verify(9)
```

### MAGIC
1. [MAGIC 1](https://stackoverflow.com/questions/76607233/error-could-not-decode-result-data-value-0x-info-method-getcreatorcou)
2. [Abi Data Decoder](https://www.moesif.com/solidity-abi-hex-decoder/decode)
3. [Abi Data Decoder II](https://bia.is/tools/abi-decoder/)

### TODO
- 上傳者：輸入網址*2、輸出新聞id(系統分配的)
- 投票者：輸出網址*2、投票
- 檢查者：輸入新聞id 、輸出驗證是否成功
- 看懂為什麼有view就會ERROR
- 讀取require的錯誤訊息 - 我猜是try-catch
- 寫前端