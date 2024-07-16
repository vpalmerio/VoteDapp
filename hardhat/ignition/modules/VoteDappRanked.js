const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("VDRanked", (m) => {
  const storageAddress = m.getParameter("storageAddress");

  const VDRanked = m.contract("VoteDappRanked", [storageAddress]);

  return { VDRanked };
});