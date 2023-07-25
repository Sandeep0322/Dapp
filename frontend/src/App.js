import React, { useEffect, useState } from 'react';
import './App.css';
import contract from './contracts/NFTCollectible.json';
import { ethers } from 'ethers';
import axios from 'axios';
import _ from "lodash";
import Moralis from "moralis";

const contractAddress = "0x86e5c4ecCb5449FB7896fC5F7133b7429402edf9";
const abi = contract.abi;

class App extends React.Component {
  state = {
    persons: [],
    account: null
  }

  connectWalletHandler = async () => {
    debugger
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Found an account! Address: ", accounts[0]);
      this.setState({ account : accounts[0] });
    } catch (err) {
      console.log(err)
    }
  }

  connectWalletButton() {
    return (
      <button onClick={this.connectWalletHandler} className='cta-button connect-wallet-button'>
        Connect Wallet
      </button>
    )
  }

  async mintNftHandler() {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);

        console.log("Initialize payment");
        let nftTxn = await nftContract.mintNFT();

        console.log("Mining... please wait");
        await nftTxn.wait();
        
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

      } else {
        console.log("Ethereum object does not exist");
      }

    } catch (err) {
      console.log(err);
    }
  }

  mintNftButton() {
    return (
      <div>
        <p>Account - {this.state.account}</p>
      <button onClick={this.mintNftHandler} className='cta-button mint-nft-button'>
        Mint NFT
      </button>
      <button onClick={this.componentDidMount} className='cta-button mint-nft-button'>My NFT's</button>
      </div>
    )
  }

  componentDidMount = async () => {
    try {
      debugger
      const res = await axios.get(`https://deep-index.moralis.io/api/v2/${this.state.account}/nft?chain=goerli&format=decimal`, { headers: { "X-Api-Key": "z9SIJtO0rvJUh6dEa5mS3MKFSuiZEv1GBlWWTUK6hNf9cW93lmGbgNUIIevdCmGQ" } })
      this.setState({ persons: res.data.result});

    } catch (error) {
      console.log("error",error.message)
    }
  }

  render() {
    return (
      <div>
        {this.state.account ? this.mintNftButton() : this.connectWalletButton()}
      <p>
        {
          this.state.persons
            .map(person =>
              <li key={person.token_id}> <img src={person.token_uri === "tokenUri" || person.token_uri === "null" ? require("./nft.png") : person.token_uri} width={"50px"} height={"50px"} className="App-logo"/></li>
            )
        }
      </p>
      </div>
    )
  }
}

export default App;