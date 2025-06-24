import "./home_page_styles.css";

import type { Signer } from "ethers";
import type { Contract } from "ethers";
import type { BrowserProvider } from "ethers";

type Props = {
  web3: {
    provider: BrowserProvider;
    signer: Signer;
    contract: Contract;
  };
};

export function HomePage({ web3 }: Props) {
  return (
    <div className="container">
      <span>asdsda</span>
      <span>asdads</span>
    </div>
  );
}
