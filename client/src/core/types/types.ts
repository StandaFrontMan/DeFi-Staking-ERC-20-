import type { Contract } from "ethers";
import type { Signer } from "ethers";
import type { BrowserProvider } from "ethers";

export interface Web3Data {
  provider: BrowserProvider;
  signer: Signer;
  contract: Contract;
}
