import { ethers } from 'ethers';

/**
 * Checks if an Ethereum address has at least a specified amount of ETH balance.
 *
 * @param address The Ethereum address to check (e.g., "0x...").
 * @param rpcUrl The RPC URL of the Ethereum network (e.g., "https://mainnet.infura.io/v3/YOUR_PROJECT_ID").
 * @param requiredEthBalance The minimum required ETH balance (default is 5).
 * @returns A Promise that resolves to a boolean indicating if the address has at least the required balance.
 */
export async function hasMinimumEthBalance(
  address: string,
  rpcUrl: string,
  requiredEthBalance: number = 5
): Promise<boolean> {
  try {
    // 1. Create a Provider: Connect to the Ethereum network using the provided RPC URL.
    const provider = new ethers.JsonRpcProvider(rpcUrl);

    // 2. Get the balance of the address in Wei (the smallest unit of Ether).
    // The balance is returned as a BigNumber.
    const balanceWei = await provider.getBalance(address);
    console.log(`Balance in Wei for ${address}: ${balanceWei.toString()}`);

    // 3. Convert Wei to Ether for easier comparison.
    const balanceEth = ethers.formatEther(balanceWei);
    console.log(`Balance in ETH for ${address}: ${balanceEth}`);

    // 4. Compare the balance with the required amount.
    // ethers.utils.parseEther converts an Ether string to BigNumber Wei.
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