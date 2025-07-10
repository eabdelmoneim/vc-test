/**
 * Example script: Marketplace Listings Count
 * This script demonstrates how to:
 * - Connect to a marketplace smart contract
 * - Get all valid listings
 * - Count total number of listings
 */

import { getContract, readContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { getAllValidListings } from "thirdweb/extensions/marketplace";
import { client } from "./client.js";

async function getContractInfo(contract: any) {
  try {
    // Try to get contract name and symbol (if available)
    const contractInfo: any = {};

    try {
      const name = await readContract({
        contract,
        method: "function name() view returns (string)",
        params: [],
      });
      contractInfo.name = name;
    } catch (e) {
      // Contract might not have a name function
      contractInfo.name = "Unknown";
    }
    
    try {
      const symbol = await readContract({
        contract,
        method: "function symbol() view returns (string)",
        params: [],
      });
      contractInfo.symbol = symbol;
    } catch (e) {
      // Contract might not have a symbol function
      contractInfo.symbol = "Unknown";
    }
    
    return contractInfo;
  } catch (error) {
    return { name: "Unknown", symbol: "Unknown" };
  }
}

async function main() {
  console.log("=== Marketplace Listings Count ===");
  
  try {
    // Define the custom chain (50312)
    const customChain = defineChain(50312);
    
    // Connect to the marketplace contract
    const contract = getContract({
      client,
      chain: customChain,
      address: "0x39462b440694d82780F0D9A96Bb1defCC94Fe3f2",
    });
    
    console.log("Connected to marketplace contract on chain:", customChain.id);
    console.log("Contract address:", contract.address);
    
    // Get contract info (name and symbol)
    console.log("Fetching contract information...");
    const contractInfo = await getContractInfo(contract);
    console.log("Contract name:", contractInfo.name);
    console.log("Contract symbol:", contractInfo.symbol);
    
    // Get all valid listings from the marketplace
    console.log("Fetching all valid listings...");
    
    const listings = await getAllValidListings({
      contract,
    });
    
    console.log("Total number of valid listings:", listings.length);
    
    // Optional: Show some details about the first few listings
    if (listings.length > 0) {
      console.log("\n--- First few listings ---");
      listings.slice(0, 3).forEach((listing, index) => {
        console.log(`Listing ${index + 1}:`);
        console.log(`  ID: ${listing.id}`);
        console.log(`  Asset Contract: ${listing.assetContractAddress}`);
        console.log(`  Token ID: ${listing.tokenId}`);
        console.log(`  Price: ${listing.pricePerToken} ${listing.currencyContractAddress}`);
        console.log(`  Quantity: ${listing.quantity}`);
        console.log("---");
      });
    }
    
  } catch (error) {
    console.error("Error fetching marketplace listings:", error);
    console.log("Note: Make sure you have a valid RPC connection for chain 50312");
    console.log("Also ensure the contract address is a valid marketplace contract");
  }
}

// Run the script
main().catch(console.error); 