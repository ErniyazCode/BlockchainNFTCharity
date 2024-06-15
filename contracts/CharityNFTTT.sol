// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CharityNFTTT is ERC721, Ownable {
    struct NFTDetails {
        string name;
        string description;
        string imageURI;
        uint256 goalAmount;
        uint256 totalDonated;
        address payable creator;
    }

    struct Donation {
        address donor;
        uint256 amount;
    }

    struct Result {
        string imageURI;
        string description;
    }

    NFTDetails[] public nfts;
    mapping(uint256 => Donation[]) public donations;
    mapping(uint256 => Result[]) public results;

    constructor() ERC721("CharityNFT", "CHNFT") {}

    function createNFT(string memory name, string memory description, string memory imageURI, uint256 goalAmount) public {
        nfts.push(NFTDetails(name, description, imageURI, goalAmount, 0, payable(msg.sender)));
        uint256 newNFTId = nfts.length - 1;
        _mint(msg.sender, newNFTId);
    }

    function donate(uint256 nftId) public payable {
        require(nftId < nfts.length, "NFT does not exist");
        require(msg.value > 0, "Donation amount must be greater than 0");
        require(nfts[nftId].creator != msg.sender, "Creator cannot donate to their own NFT");
        require(nfts[nftId].totalDonated + msg.value <= nfts[nftId].goalAmount, "Goal amount has been reached");

        nfts[nftId].totalDonated += msg.value;
        donations[nftId].push(Donation(msg.sender, msg.value));
        nfts[nftId].creator.transfer(msg.value);
    }

    function addResult(uint256 nftId, string memory imageURI, string memory description) public {
        require(nftId < nfts.length, "NFT does not exist");
        require(nfts[nftId].creator == msg.sender, "Only the creator can add results");

        results[nftId].push(Result(imageURI, description));
    }

    function getDonations(uint256 nftId) public view returns (Donation[] memory) {
        return donations[nftId];
    }

    function getResults(uint256 nftId) public view returns (Result[] memory) {
        return results[nftId];
    }

    function getNFTs() public view returns (NFTDetails[] memory) {
        return nfts;
    }

    function getUserDonations(address user) public view returns (uint256[] memory nftIds, uint256[] memory amounts) {
        uint256 donationCount = 0;
        for (uint256 i = 0; i < nfts.length; i++) {
            for (uint256 j = 0; j < donations[i].length; j++) {
                if (donations[i][j].donor == user) {
                    donationCount++;
                }
            }
        }

        nftIds = new uint256[](donationCount);
        amounts = new uint256[](donationCount);
        uint256 index = 0;
        for (uint256 i = 0; i < nfts.length; i++) {
            for (uint256 j = 0; j < donations[i].length; j++) {
                if (donations[i][j].donor == user) {
                    nftIds[index] = i;
                    amounts[index] = donations[i][j].amount;
                    index++;
                }
            }
        }

        return (nftIds, amounts);
    }

}
