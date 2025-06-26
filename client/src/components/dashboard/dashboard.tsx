import { useEffect, useMemo, useState } from "react";
import type { Web3Data } from "../../core/types/types";
import "./dashboard_styles.css";
import { ethers } from "ethers";
import { formatAddr } from "../../../utils/formateAddr";

type Props = {
  web3: Web3Data;
};

export function Dashboard({ web3 }: Props) {
  const [signerAddr, setSignerAddr] = useState<string>("");
  const [signerBalance, setSignerBalance] = useState<bigint>(0n);
  const [signerStakedAmount, setSignerStakedAmount] = useState<bigint>(0n);

  useEffect(() => {
    const load = async () => {
      try {
        const addr = await web3.signer.getAddress();
        setSignerAddr(addr);

        const balanceBN = await web3.provider.getBalance(addr);
        setSignerBalance(balanceBN);

        const stakedAmount = await web3.contract.staked(addr);
        setSignerStakedAmount(stakedAmount);
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      }
    };

    load();
  }, [web3]);

  const formattedSignerAddrBalance = useMemo(
    () => ethers.formatEther(signerBalance),
    [signerBalance]
  );
  const formattedSignerStakedAmountStaked = useMemo(
    () => ethers.formatEther(signerStakedAmount),
    [signerStakedAmount]
  );

  const formatedAddr = formatAddr(signerAddr);

  return (
    <section className="dashboard">
      <h1 className="dashboard__title">Dashboard</h1>

      <div className="dashboard__item">
        <span className="dashboard__label">Connected address:</span>
        <span className="dashboard__value">{formatedAddr}</span>
      </div>

      <div className="dashboard__item">
        <span className="dashboard__label">Balance: </span>
        <span className="dashboard__value">
          {formattedSignerAddrBalance} ETH
        </span>
      </div>

      <div className="dashboard__item">
        <span className="dashboard__label">Staked: </span>
        <span className="dashboard__value">
          {formattedSignerStakedAmountStaked} ETH
        </span>
      </div>
    </section>
  );
}
