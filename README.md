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

### Deploying Smart Contract

#### Live Network
[LINK](https://hardhat.org/tutorial/deploying-to-a-live-network)

#### Local Network
```
npx hardhat --network localhost run scripts/deploy.js
```
Remember to start a local blockchain before deploying contracts.