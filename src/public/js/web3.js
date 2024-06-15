import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';

let web3;
let nftContract;

const initWeb3 = async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
        web3 = new Web3(provider);
        await provider.request({ method: 'eth_requestAccounts' });
        const nftABI = await fetch('/js/CharityNFTABI.json').then(response => response.json());
        const nftAddress = '0xae9c565B9487a471bA6647067B8562D3c89A9C41'; // Replace with your deployed contract address
        nftContract = new web3.eth.Contract(nftABI, nftAddress);
    } else {
        console.error('Please install MetaMask!');
    }
};

const connectMetaMask = async () => {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            localStorage.setItem('metaMaskAccount', account);
            updateLoginStatus(account);
        } catch (error) {
            console.error('Could not get access to accounts:', error);
        }
    } else {
        console.error('MetaMask is not available');
    }
};

const updateLoginStatus = (account) => {
    const loginButton = document.getElementById('loginButton');
    const logoutButton = document.getElementById('logoutButton');
    loginButton.style.display = 'none';
    logoutButton.style.display = 'block';
    logoutButton.textContent = `Logout (${account.substring(0, 6)}...${account.substring(account.length - 4)})`;
    logoutButton.addEventListener('click', logOut);
};

const logOut = () => {
    localStorage.removeItem('metaMaskAccount');
    location.reload();
};

export { web3, nftContract, initWeb3, connectMetaMask, updateLoginStatus, logOut };
