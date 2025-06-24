import { useEffect, useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import { tokenAddress } from "./contracts/tokenAddress";
import { tokenAbi } from "./contracts/tokenAbi";

function App() {
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

      const tx = await signer.sendTransaction({
        to: contract.getAddress(),
        value: ethers.parseEther("100"),
      });

      await tx.wait();
    };

    load();
  }, []);

  return <p>Connected token: {tokenName}</p>;
}

export default App;
