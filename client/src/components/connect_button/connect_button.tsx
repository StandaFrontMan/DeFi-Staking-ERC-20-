import { connectWeb3 } from "../../core/utils/connectWeb3";
import { useWeb3 } from "../../store/store";

export function ConnectButton() {
  const ctx = useWeb3();

  const { hSetWeb3 } = ctx;

  const handleConnect = async () => {
    const result = await connectWeb3();
    if (!result) return;

    hSetWeb3(result);
  };

  return (
    <button onClick={() => handleConnect()} type="button">
      Connect your wallet
    </button>
  );
}
