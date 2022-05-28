import { ethers } from "ethers";
import { CONTACT_ADDRESS } from '../config';
import Web3 from 'web3';
let abiVotingPoll = require('../abi/VotingPollFactory.json');
 export const Web3ProviderLibrary = (provider:any) => {
   
    const library = new ethers.providers.Web3Provider(provider);
    library.pollingInterval = 8000;
    return library;
  }
  export async function getContract() {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');

    const votingPoll = new web3.eth.Contract(abiVotingPoll, CONTACT_ADDRESS);
    return votingPoll;
}
export async function getCurrentAccount(){
  const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
  const accounts = await web3.eth.requestAccounts()
  return accounts[0];
}