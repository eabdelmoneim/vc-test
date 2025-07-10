/**
 * Example script: Send Transaction
 * This script demonstrates how to:
 * - Prepare a transaction
 * - Send a transaction
 * - Wait for confirmation
 */

import { prepareContractCall, sendTransaction, waitForReceipt } from "thirdweb";
import { getContract } from "thirdweb";
import { ethereum } from "thirdweb/chains";
import { client, account } from "./client.js";

async function main() {
  console.log("=== Send Transaction ===");
  
  try {
    // Example: Interacting with an ERC-20 token contract
    // Replace with your actual contract address
    const contractAddress = "0x1234567890123456789012345678901234567890";
    
    const contract = getContract({
      client,
      chain: ethereum,
      address: contractAddress,
    });
    
    // Prepare a transaction (example: ERC-20 transfer)
    const transaction = prepareContractCall({
      contract,
      method: "function transfer(address to, uint256 amount)",
      params: [
        "0x0000000000000000000000000000000000000000", // recipient address
        BigInt(1000000), // amount (adjust decimals as needed)
      ],
    });
    
    console.log("Prepared transaction");
    
    // Send the transaction
    const { transactionHash } = await sendTransaction({
      transaction,
      account,
    });
    
    console.log("Transaction sent:", transactionHash);
    
    // Wait for the transaction to be mined
    const receipt = await waitForReceipt({
      client,
      chain: ethereum,
      transactionHash,
    });
    
    console.log("Transaction confirmed in block:", receipt.blockNumber);
    console.log("Gas used:", receipt.gasUsed.toString());
    
  } catch (error) {
    console.error("Error sending transaction:", error);
    console.log("Note: Make sure you have enough ETH for gas fees and the contract address is valid");
  }
}

// Run the script
main().catch(console.error); 