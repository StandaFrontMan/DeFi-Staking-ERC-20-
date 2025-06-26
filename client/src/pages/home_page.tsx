import "./home_page_styles.css";

import { useWeb3 } from "../store/store";
import { ConnectButton, Dashboard } from "../components";

export function HomePage() {
  const { web3 } = useWeb3();

  return (
    <div className="container">
      {web3 ? <Dashboard web3={web3} /> : <ConnectButton />}
    </div>
  );
}
