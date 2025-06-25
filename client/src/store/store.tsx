import type { Signer } from "ethers";
import type { Contract } from "ethers";
import type { BrowserProvider } from "ethers";
import { createContext, useContext, useState, type ReactNode } from "react";

interface Web3Data {
  provider: BrowserProvider;
  signer: Signer;
  contract: Contract;
}

interface Web3ContextType {
  web3: Web3Data | null;
  hSetWeb3: (web3: Web3Data) => void;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) throw new Error("useWeb3 must be used within Web3Provider");
  return context;
};

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [web3, setWeb3] = useState<Web3Data | null>(null);

  const hSetWeb3 = (web3: Web3Data) => {
    setWeb3(web3);
  };

  return (
    <Web3Context.Provider value={{ hSetWeb3, web3 }}>
      {children}
    </Web3Context.Provider>
  );
};
