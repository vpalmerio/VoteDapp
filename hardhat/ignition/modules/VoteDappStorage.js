const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("VDStorage", (m) => {
  const VDStorage = m.contract("VoteDappStorage");

  return { VDStorage };
});