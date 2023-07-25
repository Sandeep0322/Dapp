const InputDataDecoder = require('ethereum-input-data-decoder');
const abi = require("./abi.json")
const decoder = new InputDataDecoder(abi);
const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("https://staging.edge.guardianlink.io/"));
const axios = require("axios");
const base64 = require('base-64')

const getData = async () => {
    const contract_address = "0x26852e5797f5380AbbFc577ff558D29052005cFe";
    const owner = "0xe0D449582620a75b36996095769508C2f17861f3"
    const txns = await axios.get(`https://qaexplorer.guardiannft.org/api?module=account&action=tokentx&address=${owner}&contractaddress=${contract_address}`)
    console.log(txns.data.result[0].hash)
    const txHash = txns.data.result[0].hash
    const contractInstance = new web3.eth.Contract(abi, contract_address);
    const data = await web3.eth.getTransaction(txHash)
    const decoded = decoder.decodeData(data.input);
    const tldId = await web3.utils.hexToNumberString(decoded.inputs[2]._hex);
    const sldId = await contractInstance.methods.getDomainId(decoded.inputs[1], tldId).call();
    console.log("sldId - ",sldId)
    const tokenUri = await contractInstance.methods.tokenURI(sldId).call();
    console.log("tokenUri - ", tokenUri);
    const tokenMetadata = await axios.get(tokenUri)
    // console.log("token data ",tokenMetadata.data.image)
    const base = tokenMetadata.data.image;
    const originalBase = base.replace('data:image/svg+xml;base64,', '');
    // console.log(originalSVG)
    const svg = base64.decode(originalBase);
    console.log(svg);

}
getData();