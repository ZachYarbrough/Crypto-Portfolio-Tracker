import React, {useState} from 'react';
import {ethers} from 'ethers';

const WalletCard = () => {

    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);

    const connectWalletHandler = () => {
        if(window.ethereum) {
            window.ethereum.request({method: 'eth_requestAccounts'})
                .then(result => {
                    accountChangedHandler(result[0]);
                })
        } else {
            setErrorMessage('Install MetaMask');
        }
    }

    const accountChangedHandler = newAccount => {
        setDefaultAccount(newAccount);
        getUserBalance(newAccount.toString());
    }

    const getUserBalance = address => {
        window.ethereum.request({method: 'eth_getBalance', params: [address, 'latest']})
            .then(balance => {
                setUserBalance(ethers.utils.formatEther(balance))
            })
    }

    const chainChangedHandler = () => {
        window.location.reload();
    }

    window.ethereum.on('accountsChanged', accountChangedHandler);

    window.ethereum.on('chainChanged', chainChangedHandler);

    return (
        <div className='WalletCard'>
            <h2>Connect your wallet</h2>
            <button onClick={connectWalletHandler}>Connect</button>
            <h3>Address: {defaultAccount}</h3>
            <h3>Balance: {userBalance}</h3>
            {errorMessage}
        </div>
    )
}

export default WalletCard;