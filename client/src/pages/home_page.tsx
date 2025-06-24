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
