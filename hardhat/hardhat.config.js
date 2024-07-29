require("@nomicfoundation/hardhat-toolbox");

const dotenv = require("dotenv");
dotenv.config();
const { SEPOLIA_PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.26",
  networks: {
    sepolia: {
      url: `https://sepolia-rpc.scroll.io/` || "",
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  }
};
