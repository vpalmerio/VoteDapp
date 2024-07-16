const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("VDQuadratic", (m) => {
  const tokenAddress = m.getParameter("tokenAddress");
  const storageAddress = m.getParameter("storageAddress");

  const VDQuadratic = m.contract("VoteDappQuadratic", [tokenAddress, storageAddress]);

  return { VDQuadratic };
});