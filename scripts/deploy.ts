import { ethers } from 'ethers';

/**
 * Checks if an address has a minimum balance of ETH.
 * @param address The address to check.
 * @param rpcUrl The RPC URL of the Ethereum network.
 * @param requiredEthBalance The minimum required ETH balance.
 * @returns A boolean indicating if the balance is sufficient.
 */
export async function hasMinimumEthBalance(
  address: string,
  rpcUrl: string,
  requiredEthBalance: number = 5
): Promise<boolean> {
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
 * @param address The deployer's address.
 * @param rpcUrl The RPC URL.
 * @param weth09Address The WETH09 contract address.
 * @param nativeSymbol The native currency symbol.
 */
export async function deployContract(address: string, rpcUrl: string, weth09Address: string, nativeSymbol: string) {
    const allowed = await hasMinimumEthBalance(address, rpcUrl);

    if (allowed) {
        console.log("Balance check passed. Proceeding with deployment logic...");
        console.log(`Deploying with WETH address: ${weth09Address} and native symbol: ${nativeSymbol}`);
    } else {
        console.log("Balance check failed. Halting deployment.");
    }
}
