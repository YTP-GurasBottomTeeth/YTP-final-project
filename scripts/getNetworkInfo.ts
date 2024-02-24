import hardhat from 'hardhat'

const name = hardhat.network.name
const chainId = hardhat.network.config.chainId

console.log(`name = ${name}, chainId = ${chainId}`)