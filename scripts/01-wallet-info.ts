/**
 * Example script: Wallet Information
 * This script demonstrates how to:
 * - Get wallet address
 * - Check ETH balance
 * - Get account information
 */

import { client, account } from "./client.js";

async function main() {
  console.log("=== Wallet Information ===");
  
  // Display wallet address
  console.log("Wallet Address:", account.address);
  
  // Note: For balance checking, you can use:
  // 1. Contract extensions for ERC-20 tokens
  // 2. RPC calls for native token balances
  // 3. Third-party APIs like Alchemy, Moralis, etc.
  
  console.log("\nNext steps:");
  console.log("1. Add your actual THIRDWEB_SECRET_KEY to .env");
  console.log("2. Add your WALLET_PRIVATE_KEY to .env");
  console.log("3. Use contract extensions or RPC calls to check balances");
  console.log("4. Explore other thirdweb features!");
}

// Run the script
main().catch(console.error); 