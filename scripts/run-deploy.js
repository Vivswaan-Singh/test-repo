// scripts/run-deploy.js
// This script is executed by 'yarn start' and acts as a wrapper
// to call the deployContract function with environment variables.

import { deployContract } from './deploy.js'; // Path relative to this file

// Retrieve inputs from environment variables set by GitHub Actions
const address = process.env.INPUT_ADDRESS;
const rpcUrl = process.env.INPUT_RPCURL;
const weth09Address = process.env.INPUT_WETH09ADDRESS;
const nativeSymbol = process.env.INPUT_NATIVESYMBOL;

// Validate that all required environment variables are present
if (!address || !rpcUrl || !weth09Address || !nativeSymbol) {
  console.error('Error: One or more required environment variables are missing.');
  console.error('Please ensure INPUT_ADDRESS, INPUT_RPCURL, INPUT_WETH09ADDRESS, and INPUT_NATIVESYMBOL are set.');
  process.exit(1);
}

// Call the deployContract function
deployContract(address, rpcUrl, weth09Address, nativeSymbol)
  .then(() => {
    console.log('Deployment script finished successfully.');
  })
  .catch(error => {
    console.error('Deployment script failed:', error);
    // Exit with a non-zero code to indicate failure in the CI/CD pipeline
    process.exit(1);
  });
