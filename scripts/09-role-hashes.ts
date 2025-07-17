/**
 * Example script: Role Hash Generator
 * This script demonstrates how to:
 * - Generate keccak256 hashes for role strings
 * - Loop through an array of roles
 * - Print out role names and their corresponding hashes
 */

import { getRoleHash } from "thirdweb/extensions/permissions";

async function main() {
  console.log("=== Role Hash Generator ===");
  
  // Array of role strings
  const roles = [
    "admin",
    "asset", 
    "factory",
    "lister",
    "metadata",
    "migration",
    "minter",
    "pauser",
    "revoke",
    "signer",
    "transfer",
    "unwrap"
  ];
  
  console.log(`\nGenerating hashes for ${roles.length} roles...\n`);
  
  // Loop through roles and generate hashes
  roles.forEach((role, index) => {
    // Generate role hash using thirdweb's getRoleHash function
    const roleHash = getRoleHash(role);
    
    console.log(`${index + 1}. Role: "${role}"`);
    console.log(`   Hash: ${roleHash}`);
    console.log("");
  });
  
  console.log("✅ All role hashes generated successfully!");
  
  // Optional: Create a mapping object for easy reference
  const roleMapping: { [key: string]: string } = {};
  roles.forEach(role => {
    const roleHash = getRoleHash(role);
    roleMapping[role] = roleHash;
  });
  
  console.log("\n--- Role Mapping Object ---");
  console.log(JSON.stringify(roleMapping, null, 2));
}

// Run the script
main().catch(console.error); 