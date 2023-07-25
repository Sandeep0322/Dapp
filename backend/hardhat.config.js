require("@nomiclabs/hardhat-waffle");
require('@openzeppelin/hardhat-upgrades');
// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
const ALCHEMY_API_KEY = "";
// Replace this private key with your Goerli account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const GOERLI_PRIVATE_KEY = "0d0fdda2ca5d251192e7bb0d0c344622edd842b7b98e63757fe78968e03d07d8";
module.exports = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },
  networks: {
    GL: {
      url: `https://staging.edge.guardianlink.io`,
      accounts: [GOERLI_PRIVATE_KEY]
    },
    polygon: {
      url: `https://rpc-mumbai.maticvigil.com`,
      accounts: [GOERLI_PRIVATE_KEY]
    }
  }
};