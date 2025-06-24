import { ethers, type BrowserProvider } from "ethers";
import { HomePage } from "./home_page";
import type { Signer } from "ethers";
import type { Contract } from "ethers";
import { useEffect, useState } from "react";
import { tokenAddress } from "../contracts/tokenAddress";
import { tokenAbi } from "../contracts/tokenAbi";

export interface Web3Data {
  provider: BrowserProvider;
  signer: Signer;
  contract: Contract;
}

export function HomePageWrapper() {
  const [web3, setWeb3] = useState<Web3Data | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!window.ethereum) {
        console.error("MetaMask not detected");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, tokenAbi, signer);

      setWeb3({ provider, signer, contract });
    };

    load();
  }, []);

  if (!web3) return <p>Loading Web3...</p>;
  return <HomePage {...web3} />;
}
