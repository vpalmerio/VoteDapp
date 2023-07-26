
const VoteDappTokenSale = artifacts.require("VoteDappTokenSale");
const VoteDappToken = artifacts.require("VoteDappToken");
const VoteDappQuadratic = artifacts.require("VoteDappQuadratic");
const VoteDappRegular = artifacts.require("VoteDappRegular");
const VoteDappRanked = artifacts.require("VoteDappRanked");


module.exports = function(deployer) {
  
  //deployer.deploy(VoteDappTokenSale, 1);
  
  //deployer.deploy(VoteDappToken, "0xde954E8BC7e7619c5a823156965AA8ebfbb8b32f");

  let token = '0xE370310D31D3FD325873aB8b99a510eF4B54B0b8'

  //deployer.deploy(VoteDappRegular, token);
  //deployer.deploy(VoteDappQuadratic, token);

  deployer.deploy(VoteDappRanked)
};






