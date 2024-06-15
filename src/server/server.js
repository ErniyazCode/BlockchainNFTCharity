const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.static(path.join(__dirname, '..', 'html')));

// Serve HTML pages
app.get('/create-nft', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'html', 'create-nft.html'));
});

app.get('/nfts', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'html', 'nfts.html'));
});

app.get('/nft-detail', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'html', 'nft-detail.html'));
});

app.get('/add-result', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'html', 'add-result.html'));
});

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'html', 'profile.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Serve ABI file
app.get('/js/CharityNFTABI.json', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'js', 'CharityNFTABI.json'));
});