import './App.css';
import NavBar from './Components/NavBar';
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

function App() {

  const [isConnected, setIsConnected] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [shortAddress, setShortAddress] = useState(null);

  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(result => {
          console.log(result[0])
          accountChangedHandler(result[0]);
        })
    } else {
      setErrorMessage('Install MetaMask');
    }
  }

  const getUserBalance = address => {
    window.ethereum.request({ method: 'eth_getBalance', params: [address, 'latest'] })
      .then(balance => {
        setUserBalance(ethers.utils.formatEther(balance))
      })
  }

  const accountChangedHandler = newAccount => {
    setIsConnected(true);
    setDefaultAccount(newAccount);
    addressShortenHandler(newAccount);
  }

  const addressShortenHandler = address => {
    const addressPrefix = address.slice(0, 5);
    const addressSufix = address.slice((address.length - 5), (address.length - 1));

    const shortenedAddress = `${addressPrefix}...${addressSufix}`;

    setShortAddress(shortenedAddress);
  }

  const chainChangedHandler = () => {
    setIsConnected(false);
    window.location.reload();
  }

  window.ethereum.on('accountsChanged', accountChangedHandler);

  window.ethereum.on('chainChanged', chainChangedHandler);

  useEffect(() => {
    getUserBalance(defaultAccount);
  });

  return (
    <div className="App">
      <NavBar isConnected={isConnected} shortAddress={shortAddress} connectWalletHandler={connectWalletHandler}></NavBar>
      <p>Balance: {userBalance}</p>
    </div>
  );
}

export default App;
