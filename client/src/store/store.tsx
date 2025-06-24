import { createContext, useContext, useState, type ReactNode } from "react";

interface Web3ContextType {
  test: string;
}

const Web3Context = createContext<Web3ContextType | null>(null);

export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [test, setTest] = useState<string>("Wanna hack");

  return (
    <Web3Context.Provider value={{ test }}>{children}</Web3Context.Provider>
  );
};
