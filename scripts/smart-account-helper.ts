import { createThirdwebClient } from "thirdweb";
import { privateKeyToAccount, smartWallet, createWallet } from "thirdweb/wallets";
import { sepolia, mainnet } from "thirdweb/chains";
import type { Chain } from "thirdweb/chains";
import type { ThirdwebClient } from "thirdweb";
import type { Account } from "thirdweb/wallets";

export interface SmartAccountConfig {
  client: ThirdwebClient;
  chain: Chain;
  sponsorGas?: boolean;
}

/**
 * Create a smart account using a private key as the personal account
 */
export async function createSmartAccountWithPrivateKey(
  config: SmartAccountConfig & { privateKey: string }
): Promise<Account> {
  // Create personal account from private key
  const personalAccount = privateKeyToAccount({
    client: config.client,
    privateKey: config.privateKey,
  });

  // Configure smart wallet
  const wallet = smartWallet({
    chain: config.chain,
    sponsorGas: config.sponsorGas ?? true,
  });

  // Connect and return smart account
  return await wallet.connect({
    client: config.client,
    personalAccount,
  });
}

/**
 * Create a smart account using an external wallet (MetaMask, etc.)
 */
export async function createSmartAccountWithWallet(
  config: SmartAccountConfig & { walletId: string }
): Promise<Account> {
  // Create external wallet
  const personalWallet = createWallet(config.walletId as any);
  
  // Connect the external wallet first
  const personalAccount = await personalWallet.connect({
    client: config.client,
  });

  // Configure smart wallet
  const wallet = smartWallet({
    chain: config.chain,
    sponsorGas: config.sponsorGas ?? true,
  });

  // Connect and return smart account
  return await wallet.connect({
    client: config.client,
    personalAccount,
  });
}

/**
 * Example usage patterns
 */
export const SmartAccountExamples = {
  // For backend/server-side applications
  backend: async (client: ThirdwebClient, privateKey: string) => {
    return createSmartAccountWithPrivateKey({
      client,
      chain: sepolia,
      privateKey,
      sponsorGas: true,
    });
  },

  // For frontend applications with MetaMask
  frontend: async (client: ThirdwebClient) => {
    return createSmartAccountWithWallet({
      client,
      chain: mainnet,
      walletId: "io.metamask",
      sponsorGas: true,
    });
  },

  // For mainnet production
  production: async (client: ThirdwebClient, privateKey: string) => {
    return createSmartAccountWithPrivateKey({
      client,
      chain: mainnet,
      privateKey,
      sponsorGas: false, // You might want to handle gas differently in production
    });
  },
}; 