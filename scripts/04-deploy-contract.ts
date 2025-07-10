/**
 * Example script: Deploy Contract
 * This script demonstrates how to:
 * - Deploy a smart contract
 * - Use thirdweb's prebuilt contracts
 * - Get deployment information
 */

import { deployPublishedContract } from "thirdweb/deploys";
import { sepolia } from "thirdweb/chains"; // Using testnet for deployment example
import { client, account } from "./client.js";

async function main() {
  console.log("=== Deploy Contract ===");
  
  try {
    // Example: Deploy an ERC-721 (NFT) contract
    // You can find more prebuilt contracts at: https://thirdweb.com/explore
    
    const contractAddress = await deployPublishedContract({
      client,
      chain: sepolia, // Using Sepolia testnet
      account,
      contractId: "ERC721Drop", // thirdweb's NFT Drop contract
      contractParams: {
        name: "My NFT Collection",
        symbol: "MNC",
        description: "A sample NFT collection deployed via thirdweb",
        image: "https://example.com/image.png", // Replace with your image URL
        external_link: "https://example.com",
        seller_fee_basis_points: 500, // 5% royalty
        fee_recipient: account.address,
        primary_sale_recipient: account.address,
      },
      publisher: "0x...", // thirdweb's publisher address (optional)
      version: "latest",
    });
    
    console.log("Contract deployed successfully!");
    console.log("Contract address:", contractAddress);
    console.log("View on Sepolia Etherscan:", `https://sepolia.etherscan.io/address/${contractAddress}`);
    
    // You can now interact with your deployed contract
    console.log("\nNext steps:");
    console.log("1. Update your scripts to use the new contract address");
    console.log("2. Test minting NFTs using the contract");
    console.log("3. Verify the contract on Etherscan if needed");
    
  } catch (error) {
    console.error("Error deploying contract:", error);
    console.log("Note: Make sure you have enough ETH for deployment on the target chain");
  }
}

// Run the script
main().catch(console.error); 