const Ethers = require('ethers');
const provider = new Ethers.providers.JsonRpcProvider("https://staging.edge.guardianlink.io/");
const abi = require("./registry.json")
const Web3EthContract = require('web3-eth-contract');
Web3EthContract.setProvider('https://staging.edge.guardianlink.io/');

const ethers = async() => {
    const tldName = "wallet";
    const sldName = "sandeep";
    const contract = new Web3EthContract(abi, "0x8e4037Ce2D97EA9BF0bB279686Ff94D3d3154296");
    let tldId = await contract.methods.getDomainId(tldName).call()
    console.log(tldId)
      let sldId = await contract.methods.getDomainId(sldName, tldId).call();
      let getKey = await contract.methods.getMany(["eth", "btc", "gl", "starknet", "ltc", "doge", "matic", "email", "url", "avatar", "description", "notice", "keywords", "discord", "github", "twitter", "telegram"], sldId).call();
    console.log(getKey)
    // const contract = new Ethers.Contract("0x8e4037Ce2D97EA9BF0bB279686Ff94D3d3154296",abi,provider);
    // console.log("name", await contract.name())
    // let getKey = await contract.getALL(["eth"],["sandeep","wallet"])
    // console.log(getKey)

}
ethers();