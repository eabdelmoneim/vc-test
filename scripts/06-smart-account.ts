import { createThirdwebClient } from "thirdweb";
import { privateKeyToAccount, smartWallet } from "thirdweb/wallets";
import { sepolia } from "thirdweb/chains";
import { getWalletBalance } from "thirdweb/wallets";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Validate required environment variables
if (!process.env.THIRDWEB_SECRET_KEY) {
  throw new Error("THIRDWEB_SECRET_KEY is required in .env file");
}

if (!process.env.WALLET_PRIVATE_KEY) {
  throw new Error("WALLET_PRIVATE_KEY is required in .env file");
}

async function connectSmartAccount() {
  try {
    // Create thirdweb client with secret key (for backend/server side)
    const client = createThirdwebClient({
      secretKey: process.env.THIRDWEB_SECRET_KEY as string,
    });

    // Create a personal account (the "key" that unlocks the smart account)
    // This can be any wallet type: MetaMask, In-App Wallet, or private key
    const personalAccount = privateKeyToAccount({
      client,
      privateKey: process.env.WALLET_PRIVATE_KEY as string,
    });

    console.log("Personal account address:", personalAccount.address);

    // Configure the smart wallet
    const wallet = smartWallet({
      chain: sepolia, // The chain where the smart account will be deployed
      sponsorGas: true, // Enable gasless transactions (requires API key with billing)
    });

    // Connect the smart wallet using the personal account as the signer
    const smartAccount = await wallet.connect({
      client,
      personalAccount,
    });

    console.log("Smart account address:", smartAccount.address);
    console.log("Smart account connected successfully!");

    // Check smart account balance
    const balance = await getWalletBalance({
      client,
      chain: sepolia,
      address: smartAccount.address,
    });

    console.log("Smart account balance:", balance.displayValue, balance.symbol);

    return smartAccount;
  } catch (error) {
    console.error("Error connecting smart account:", error);
    throw error;
  }
}

// Run the example
connectSmartAccount()
  .then((smartAccount) => {
    console.log("✅ Smart account setup complete");
  })
  .catch((error) => {
    console.error("❌ Failed to connect smart account:", error);
  }); 