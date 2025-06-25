import { ethers } from "ethers";
import { tokenAddress } from "../../contracts/tokenAddress";
import { tokenAbi } from "../../contracts/tokenAbi";

export async function connectWeb3() {
  if (!window.ethereum) {
    console.error("MetaMask not detected");
    return;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(tokenAddress, tokenAbi, signer);

  return { provider, signer, contract };
}
