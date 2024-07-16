const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("VDRegular", (m) => {
  const tokenAddress = m.getParameter("tokenAddress");
  const storageAddress = m.getParameter("storageAddress");

  const VDRegular = m.contract("VoteDappRegular", [tokenAddress, storageAddress]);

  return { VDRegular };
});