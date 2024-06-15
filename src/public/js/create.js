// let web3;
//         let charityNFT;

//         const initWeb3 = async () => {
//             const provider = await detectEthereumProvider();
//             if (provider) {
//                 web3 = new Web3(provider);
//                 await provider.request({ method: 'eth_requestAccounts' });
//                 const charityNFTABI = await fetch('/js/CharityNFTABI.json').then(response => response.json());
//                 const charityNFTAddress = '0x2e45eca139dcc5EDF13153aB7D411eC06eCA568D'; // Replace with your deployed contract address
//                 charityNFT = new web3.eth.Contract(charityNFTABI, charityNFTAddress);
//             } else {
//                 console.error('Please install MetaMask!');
//             }
//         };

//         const connectMetaMask = async () => {
//             if (typeof window.ethereum !== 'undefined') {
//                 try {
//                     const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//                     const account = accounts[0];
//                     localStorage.setItem('metaMaskAccount', account);
//                     updateLoginStatus(account);
//                 } catch (error) {
//                     console.error('Could not get access to accounts:', error);
//                 }
//             } else {
//                 console.error('MetaMask is not available');
//             }
//         };

//         const updateLoginStatus = (account) => {
//             const loginButton = document.getElementById('loginButton');
//             loginButton.textContent = `Logged in as ${account.substring(0, 6)}...${account.substring(account.length - 4)}`;
//             loginButton.removeEventListener('click', connectMetaMask);
//             loginButton.addEventListener('click', logOut);
//         };

//         const logOut = () => {
//             localStorage.removeItem('metaMaskAccount');
//             location.reload();
//         };

//         document.addEventListener('DOMContentLoaded', async () => {
//             await initWeb3();
//             const loginButton = document.getElementById('loginButton');
//             const accountInfo = localStorage.getItem('metaMaskAccount');

//             if (accountInfo) {
//                 updateLoginStatus(accountInfo);
//             }

//             loginButton.addEventListener('click', connectMetaMask);

//             document.getElementById('create-nft-form').addEventListener('submit', async function(event) {
//                 event.preventDefault();

//                 const name = document.getElementById('name').value;
//                 const description = document.getElementById('description').value;
//                 const goalAmount = web3.utils.toWei(document.getElementById('goalAmount').value, 'ether');
//                 const image = document.getElementById('image').files[0];

//                 // Upload image to IPFS
//                 const formData = new FormData();
//                 formData.append('file', image);

//                 const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
//                     method: 'POST',
//                     body: formData,
//                     headers: {
//                         'pinata_api_key': 'baf07ef2fe7ce3e69a08', // Replace with your Pinata API key
//                         'pinata_secret_api_key': '75a97493dd0ce5dc0ece4ee506e95e2cfcbaefb20e35e86cd667e0562b486e2c' // Replace with your Pinata secret API key
//                     }
//                 });

//                 const data = await res.json();
//                 const imageURI = `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;

//                 // Interact with the smart contract
//                 const accounts = await web3.eth.getAccounts();
//                 await charityNFT.methods.createNFT(name, description, imageURI, goalAmount).send({ from: accounts[0] });

//                 alert('NFT created successfully!');
//                 window.location.href = 'nfts.html';
//             });
//         });