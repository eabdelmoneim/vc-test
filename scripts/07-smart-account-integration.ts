import { client } from "./client";
import { smartWallet } from "thirdweb/wallets";
import { sepolia } from "thirdweb/chains";
import { createSmartAccountWithPrivateKey } from "./smart-account-helper";
import { sendTransaction } from "thirdweb";
import { getWalletBalance } from "thirdweb/wallets";
import dotenv from "dotenv";

dotenv.config();

async function demonstrateSmartAccountIntegration() {
  try {
    console.log("🚀 Creating smart account using existing client setup...");

    // Option 1: Using the helper function
    const smartAccount = await createSmartAccountWithPrivateKey({
      client,
      chain: sepolia,
      privateKey: process.env.WALLET_PRIVATE_KEY as string,
      sponsorGas: true,
    });

    console.log("✅ Smart account created:", smartAccount.address);

    // Option 2: Direct integration (same as above but inline)
    const wallet = smartWallet({
      chain: sepolia,
      sponsorGas: true,
    });

    const directSmartAccount = await wallet.connect({
      client,
      personalAccount: smartAccount, // or use your existing account from client.ts
    });

    console.log("✅ Direct smart account:", directSmartAccount.address);

    // Check balance
    const balance = await getWalletBalance({
      client,
      chain: sepolia,
      address: smartAccount.address,
    });

    console.log(`💰 Smart account balance: ${balance.displayValue} ${balance.symbol}`);

    // Now you can use this smart account for gasless transactions
    console.log("🎯 Smart account ready for gasless transactions!");

    return smartAccount;
  } catch (error) {
    console.error("❌ Error setting up smart account:", error);
    throw error;
  }
}

// Run the integration example
demonstrateSmartAccountIntegration()
  .then(() => {
    console.log("✅ Smart account integration complete!");
  })
  .catch((error) => {
    console.error("❌ Integration failed:", error);
  }); 