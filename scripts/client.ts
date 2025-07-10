import { createThirdwebClient } from "thirdweb";
import { privateKeyToAccount } from "thirdweb/wallets";
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

// Create thirdweb client
export const client = createThirdwebClient({
  secretKey: process.env.THIRDWEB_SECRET_KEY,
});

// Create account from private key
export const account = privateKeyToAccount({
  client,
  privateKey: process.env.WALLET_PRIVATE_KEY,
});

console.log("Thirdweb client initialized successfully");
console.log("Account address:", account.address); 