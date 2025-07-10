/**
 * Example script: Contract Reading with Extensions
 * This script demonstrates how to:
 * - Connect to a smart contract
 * - Read contract data using thirdweb extensions
 * - Use built-in ERC20 contract extensions
 */

import { getContract, readContract } from "thirdweb";
import { avalanche } from "thirdweb/chains";
import { client } from "./client.js";

// Define standard ERC20 function signatures
const ERC20_FUNCTIONS = {
  name: "function name() view returns (string)",
  symbol: "function symbol() view returns (string)", 
  totalSupply: "function totalSupply() view returns (uint256)",
  decimals: "function decimals() view returns (uint8)",
} as const;

async function main() {
  console.log("=== Contract Reading with Structured Approach ===");
  
  try {
    // Reading from contract on Avalanche C-Chain
    const contract = getContract({
      client,
      chain: avalanche,
      address: "0x74Bad411480C1b298E2E9928d3B8E10988EC4898", // Contract on Avalanche
    });
    
    console.log("Connected to contract:", contract.address);
    console.log("Chain:", avalanche.name);
    
    // Read contract data using structured approach
    const [contractName, contractSymbol, contractTotalSupply, contractDecimals] = await Promise.all([
      readContract({
        contract,
        method: ERC20_FUNCTIONS.name,
        params: [],
      }),
      readContract({
        contract,
        method: ERC20_FUNCTIONS.symbol,
        params: [],
      }),
      readContract({
        contract,
        method: ERC20_FUNCTIONS.totalSupply,
        params: [],
      }),
      readContract({
        contract,
        method: ERC20_FUNCTIONS.decimals,
        params: [],
      }),
    ]);
    
    console.log("Contract Name:", contractName);
    console.log("Contract Symbol:", contractSymbol);
    console.log("Total Supply:", contractTotalSupply.toString());
    console.log("Decimals:", contractDecimals);
    
    // Optional: Display additional information
    console.log("\n--- Contract Summary ---");
    console.log(`Token: ${contractName} (${contractSymbol})`);
    console.log(`Total Supply: ${contractTotalSupply.toString()}`);
    console.log(`Decimals: ${contractDecimals}`);
    console.log(`Contract Address: ${contract.address}`);
    console.log(`Chain: ${avalanche.name} (${avalanche.id})`);
    
    // Calculate formatted total supply
    const formattedSupply = Number(contractTotalSupply) / Math.pow(10, Number(contractDecimals));
    console.log(`Formatted Total Supply: ${formattedSupply.toLocaleString()} ${contractSymbol}`);
    
  } catch (error) {
    console.error("Error reading contract:", error);
    console.log("Note: Make sure you have a valid RPC connection for the chain");
    console.log("Also ensure the contract implements the ERC20 standard");
  }
}

// Run the script
main().catch(console.error); 