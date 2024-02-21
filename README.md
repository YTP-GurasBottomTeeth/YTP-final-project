# YTP Final Project

## For Developers

### Install All Required Packages
Please run `npm install` in your terminal.

### Typescript
[LINK](https://hardhat.org/hardhat-runner/docs/guides/typescript)

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

### MAGIC
1. [MAGIC 1](https://stackoverflow.com/questions/76607233/error-could-not-decode-result-data-value-0x-info-method-getcreatorcou)
2. [Abi Data Decoder](https://www.moesif.com/solidity-abi-hex-decoder/decode)
3. [Abi Data Decoder II](https://bia.is/tools/abi-decoder/)

### TODO
- 上傳者：輸入網址*2、輸出新聞id(系統分配的)
- 投票者：輸出網址*2、投票
- 檢查者：輸入新聞id 、輸出驗證是否成功