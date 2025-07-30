import { ethers } from 'ethers';

/**
 * Checks if an address has a minimum balance of ETH.
 * @param {string} address The address to check.
 * @param {string} rpcUrl The RPC URL of the Ethereum network.
 * @param {number} [requiredEthBalance=5] The minimum required ETH balance.
 * @returns {Promise<boolean>} A boolean indicating if the balance is sufficient.
 */
export async function hasMinimumEthBalance(
  address,
  rpcUrl,
  requiredEthBalance = 5
) {
  try {
    // 1. Create a Provider: Connect to the Ethereum network.
    const provider = new ethers.JsonRpcProvider(rpcUrl);

    // 2. Get the balance of the address in Wei.
    const balanceWei = await provider.getBalance(address);
    console.log(`Balance in Wei for ${address}: ${balanceWei.toString()}`);

    // 3. Convert Wei to Ether for easier comparison.
    const balanceEth = ethers.formatEther(balanceWei);
    console.log(`Balance in ETH for ${address}: ${balanceEth}`);

    // 4. Compare the balance with the required amount.
    const requiredWei = ethers.parseEther(requiredEthBalance.toString());

    if (balanceWei >= requiredWei) {
      console.log(`Success: ${address} has ${balanceEth} ETH, which is at least ${requiredEthBalance} ETH.`);
      return true;
    } else {
      console.log(`Failure: ${address} has ${balanceEth} ETH, which is less than ${requiredEthBalance} ETH.`);
      return false;
    }
  } catch (error) {
    console.error(`An error occurred while checking balance for ${address}:`, error);
    return false; // Return false on error
  }
}

/**
 * Main function to deploy the contract after checking the balance.
 * @param {string} address The deployer's address.
 * @param {string} rpcUrl The RPC URL.
 * @param {string} weth09Address The WETH09 contract address.
 * @param {string} nativeSymbol The native currency symbol.
 */
export async function deployContract(address, rpcUrl, weth09Address, nativeSymbol) {
    const allowed = await hasMinimumEthBalance(address, rpcUrl);

    if (allowed) {
        console.log("Balance check passed. Proceeding with deployment logic...");
        console.log(`Deploying with WETH address: ${weth09Address} and native symbol: ${nativeSymbol}`);
        // Add your contract deployment logic here
    } else {
        console.log("Balance check failed. Halting deployment.");
    }
}
