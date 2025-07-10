/**
 * Example script: Burn ERC1155 NFT
 * This script demonstrates how to:
 * - Connect to an ERC1155 contract
 * - Burn a specific token ID and quantity
 * - Confirm the transaction
 */

import { getContract, sendAndConfirmTransaction } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { burn } from "thirdweb/extensions/erc1155";
import { client, account } from "./client.js";

async function main() {
  console.log("=== Burn ERC1155 NFT ===");
  
  try {
    // Define the chain (80002 = Polygon Amoy Testnet)
    const chain = defineChain(80002);
    
    // Connect to the ERC1155 contract
    const contract = getContract({
      client,
      chain,
      address: "0x71983ef5E37Ef7e280aF2FCdc194e58034d31804",
    });
    
    console.log("Connected to ERC1155 contract on chain:", chain.id);
    console.log("Contract address:", contract.address);
    
    // TODO: Replace these values with your specific requirements
    const tokenId = 0n; // Token ID to burn (as bigint)
    const quantity = 2n; // Quantity to burn (as bigint)
    
    console.log(`\nPreparing to burn ${quantity} token(s) of ID ${tokenId}...`);
    
    // Note: You need to have a connected wallet/account to sign the transaction
    // This requires setting up an account in your client configuration
    console.log("Note: Make sure you have:");
    console.log("1. A connected wallet/account in your client configuration");
    console.log("2. Ownership of the tokens you want to burn");
    console.log("3. Sufficient gas for the transaction");
    
    console.log("\nBurn transaction prepared.");
    console.log("Ready to execute...");
    
    // Uncomment the following lines when you have a connected account:
    // Prepare the burn transaction with account parameter
    const transaction = burn({
      contract,
      account: account.address, // Replace with your wallet address
      id: tokenId,
      value: quantity,
    });
    
    
    
    const receipt = await sendAndConfirmTransaction({
      account, // Your connected account
      transaction,
    });
    
    console.log("✅ Burn transaction successful!");
    console.log("Transaction hash:", receipt.transactionHash);
    console.log("Gas used:", receipt.gasUsed);
        
  } catch (error) {
    console.error("Error burning ERC1155 NFT:", error);
    console.log("\nPossible issues:");
    console.log("- Invalid contract address or chain ID");
    console.log("- No account connected to sign the transaction");
    console.log("- Insufficient token balance to burn");
    console.log("- Network connection issues");
  }
}

// Run the script
main().catch(console.error); 