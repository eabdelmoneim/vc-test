# Thirdweb TypeScript Project

A TypeScript project for interacting with thirdweb's Web3 development platform. This project contains individual script files to perform different blockchain tasks using thirdweb's SDK.

## Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Environment Configuration

Copy the example environment file and add your credentials:

```bash
cp .env.example .env
```

Then edit `.env` and add your credentials:

```bash
# Get your secret key from: https://thirdweb.com/create-api-key
THIRDWEB_SECRET_KEY=your_secret_key_here

# Your wallet's private key (for testing, never use production keys)
WALLET_PRIVATE_KEY=your_wallet_private_key_here

# Optional: Custom RPC URL
# RPC_URL=your_custom_rpc_url
```

### 3. Get Your Thirdweb API Key

1. Go to [https://thirdweb.com/create-api-key](https://thirdweb.com/create-api-key)
2. Create a new project
3. Copy your secret key to the `.env` file

## Available Scripts

### Basic Wallet Operations

```bash
# Get wallet information and setup instructions
pnpm dev scripts/01-wallet-info.ts
```

### Contract Interactions

```bash
# Read data from smart contracts
pnpm dev scripts/02-contract-read.ts

# Send transactions to smart contracts
pnpm dev scripts/03-send-transaction.ts

# Deploy new smart contracts
pnpm dev scripts/04-deploy-contract.ts
```

## Project Structure

```
vc-test/
├── scripts/
│   ├── client.ts              # Shared thirdweb client configuration
│   ├── 01-wallet-info.ts      # Wallet information and balance checking
│   ├── 02-contract-read.ts    # Reading from smart contracts
│   ├── 03-send-transaction.ts # Sending transactions
│   └── 04-deploy-contract.ts  # Deploying contracts
├── .env.example               # Environment variables template
├── package.json
├── tsconfig.json
└── README.md
```

## Common Use Cases

### 1. Reading Contract Data

The `02-contract-read.ts` script shows how to:
- Connect to any smart contract
- Read public variables and functions
- Handle different data types (strings, numbers, arrays)

### 2. Sending Transactions

The `03-send-transaction.ts` script demonstrates:
- Preparing contract calls
- Sending transactions with proper gas handling
- Waiting for transaction confirmation

### 3. Deploying Contracts

The `04-deploy-contract.ts` script covers:
- Deploying prebuilt thirdweb contracts
- Setting initial parameters
- Getting contract addresses for future interactions

## Development

### Building the Project

```bash
pnpm build
```

### Type Checking

```bash
npx tsc --noEmit
```

## Supported Chains

This project can work with any EVM-compatible chain. Common options:

- Ethereum Mainnet (`ethereum`)
- Polygon (`polygon`) 
- Arbitrum (`arbitrum`)
- Base (`base`)
- Optimism (`optimism`)
- Sepolia Testnet (`sepolia`)

Import chains from `thirdweb/chains`:

```typescript
import { ethereum, polygon, sepolia } from "thirdweb/chains";
```

## Security Notes

⚠️ **Important Security Considerations:**

1. **Never commit your `.env` file** to version control
2. **Use testnet funds** for development and testing
3. **Use separate wallets** for development vs production
4. **Validate all user inputs** in production applications
5. **Test thoroughly** on testnets before mainnet deployment

## Resources

- [Thirdweb Documentation](https://portal.thirdweb.com/)
- [Thirdweb TypeScript SDK](https://portal.thirdweb.com/typescript/v5)
- [Thirdweb Discord](https://discord.gg/thirdweb)
- [Example Contracts](https://thirdweb.com/explore)

## Troubleshooting

### Common Issues

1. **"Invalid client ID" error**: Make sure your `THIRDWEB_SECRET_KEY` is correct
2. **"Insufficient funds" error**: Ensure your wallet has enough ETH for gas fees
3. **Network errors**: Check your internet connection and RPC endpoints
4. **Private key errors**: Ensure your private key starts with `0x` and is 64 characters

### Getting Help

- Check the [thirdweb documentation](https://portal.thirdweb.com/)
- Ask questions in the [thirdweb Discord](https://discord.gg/thirdweb)
- Review example code in the scripts directory

## License

ISC 