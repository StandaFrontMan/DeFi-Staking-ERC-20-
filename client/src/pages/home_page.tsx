import { useEffect } from "react";
import { ethers } from "ethers";
import { tokenAbi } from "../contracts/tokenAbi";
import { tokenAddress } from "../contracts/tokenAddress";
import type { Contract } from "ethers";
import type { Signer } from "ethers";
import type { BrowserProvider } from "ethers";

export interface Web3Data {
  provider: BrowserProvider;
  signer: Signer;
  contract: Contract;
}

export function HomePage({ provider, signer, contract }: Web3Data) {
  const getCtAdress = async () => {
    const addr = await contract.getAddress();

    console.log(addr);
  };

  return (
    <button type="button" onClick={() => getCtAdress()}>
      Interact with contract
    </button>
  );
}
