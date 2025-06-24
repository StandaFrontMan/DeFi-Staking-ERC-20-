import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const TokenModule = buildModule("TokenModule", (m) => {
  const initialSupply = m.getParameter("initialSupply", 1000000n * 10n ** 18n);
  const token = m.contract("Token", [initialSupply]);

  return { token };
});

export default TokenModule;
