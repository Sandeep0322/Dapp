const Web3 = require('web3');

async function main() {
    const abi  = require('./registry.json');
    const rpcURL = 'https://rpc-mumbai.maticvigil.com'
    const web3 = new Web3(new Web3.providers.HttpProvider(rpcURL));

    const address = '0xB0AfAf475E567A9A0AfE266f312E5911739f473D'
    const WALLET_ADDRESS = "0x9e5135494641A48f3723faD40dFb04E0Bfd8EE2c"

    const account = web3.eth.accounts.privateKeyToAccount("3f5df68aaabce6c1ecb23fc6977b3c9f06a3aad17e2c2ecc8abdeea8a193b30d");

    const contract = new web3.eth.Contract(abi, address);
    
    try {
        r = await contract.methods.mintSld("0x9e5135494641A48f3723faD40dFb04E0Bfd8EE2c","s","13681194913005736661451703431383239036076055651263216114967745469462720029232",[],[]).send({ from: account.address, gas: 210000 });
        console.log(r);
    } catch (err) {
        console.log(err);
    }
}

main().then((r) => {
    console.log(r);
}).catch(err => {
    console.log(err);
});