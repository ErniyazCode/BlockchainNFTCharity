import { web3, nftContract } from './web3.js';

document.addEventListener('DOMContentLoaded', async () => {
    const nftsContainer = document.getElementById('nftsContainer');
    const nfts = await nftContract.methods.getNFTs().call();
    nfts.forEach((nft, index) => {
        const nftElement = document.createElement('div');
        nftElement.className = 'col-md-4';
        nftElement.innerHTML = `
            <div class="card mb-4">
                <img src="${nft.imageURI}" class="card-img-top" alt="${nft.name}">
                <div class="card-body">
                    <h5 class="card-title">${nft.name}</h5>
                    <p class="card-text">${nft.description}</p>
                    <a href="nft-detail.html?id=${index}" class="btn btn-primary">View Details</a>
                </div>
            </div>
        `;
        nftsContainer.appendChild(nftElement);
    });
});
