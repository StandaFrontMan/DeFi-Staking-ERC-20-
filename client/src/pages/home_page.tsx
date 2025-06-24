import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { tokenAddress } from "../contracts/tokenAddress";
import { tokenAbi } from "../contracts/tokenAbi";
import { useWeb3 } from "../store/store";

export function HomePage() {
  const ctx = useWeb3();

  const [tokenName, setTokenName] = useState<string>("");

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

      const name = await contract.name();

      setTokenName(name);
    };

    load();
  }, []);

  if (!ctx) return null;

  const { test } = ctx;

  console.log(test);

  return <p>Connected token: {tokenName}</p>;
}
