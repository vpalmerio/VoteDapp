const VDTSaleModule = require("../ignition/modules/VoteDappTokenSale");
const VDQuadraticModule = require("../ignition/modules/VoteDappQuadratic");
const VDRegularModule = require("../ignition/modules/VoteDappRegular");
const VDRankedModule = require("../ignition/modules/VoteDappRanked");
const VDStorageModule = require("../ignition/modules/VoteDappStorage");

const ONE_GWEI = 1_000_000_000n;

async function main() {

  const tokenPrice = ONE_GWEI;

  const { VDTSale } = await hre.ignition.deploy(VDTSaleModule, {
    parameters: { VDTSale: { tokenPrice } },
  });

  const tokenAddress = await VDTSale.getAddress();

  const { VDStorage } = await hre.ignition.deploy(VDStorageModule);

  const storageAddress = await VDStorage.getAddress();

  const { VDQuadratic } = await hre.ignition.deploy(VDQuadraticModule, {
    parameters: { VDQuadratic: { tokenAddress, storageAddress} },
  });

  const VDQAddress = await VDQuadratic.getAddress();

  const { VDRegular } = await hre.ignition.deploy(VDRegularModule, {
    parameters: { VDRegular: { tokenAddress, storageAddress} },
  });

  const VDRAddress = await VDRegular.getAddress();

  const { VDRanked } = await hre.ignition.deploy(VDRankedModule, {
    parameters: { VDRanked: {  storageAddress} },
  });

  const VDRankedAddress = await VDRanked.getAddress();

  VDStorage.addPollType([VDQAddress, VDRAddress, VDRankedAddress]);

  console.log(`VDTSale deployed to: ${tokenAddress}`);
  console.log(`VDStorage deployed to: ${storageAddress}`);
  console.log(`VDQuadratic deployed to: ${VDQAddress}`);
  console.log(`VDRegular deployed to: ${VDRAddress}`);
  console.log(`VDRanked deployed to: ${VDRankedAddress}`);
}

main().catch(console.error);