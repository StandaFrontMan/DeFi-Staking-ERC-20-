import "./home_page_styles.css";

import { useEffect, useState } from "react";

import { useWeb3 } from "../store/store";
import { ConnectButton } from "../components/connect_button/connect_button";

export function HomePage() {
  const { web3 } = useWeb3();

  const [address, setAddress] = useState("");

  useEffect(() => {
    const getAddress = async () => {
      if (!web3) return;
      const addr = await web3.signer.getAddress();
      setAddress(addr);
    };

    getAddress();
  }, [web3]);

  return (
    <div className="container">
      {web3 ? <span>{address}</span> : <ConnectButton />}
    </div>
  );
}
