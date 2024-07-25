const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const ONE_GWEI = 1_000_000_000n;

module.exports = buildModule("VDTSale", (m) => {
  const tokenPrice = m.getParameter("tokenPrice", ONE_GWEI);
  const VDTSale = m.contract("VoteDappToken", [tokenPrice]);

  return { VDTSale };
});