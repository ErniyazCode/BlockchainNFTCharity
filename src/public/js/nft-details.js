document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenId = urlParams.get('tokenId');
    const tokenURI = await nftContract.methods.tokenURI(tokenId).call();
    const res = await fetch(tokenURI);
    const metadata = await res.json();

    document.getElementById('nft-image').src = metadata.image;
    document.getElementById('nft-name').textContent = metadata.name;
    document.getElementById('nft-description').textContent = metadata.description;
});
