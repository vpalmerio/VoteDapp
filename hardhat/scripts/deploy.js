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

    const tokenAddress = await VDTSale.getContractAddr();

  const { VDStorage } = await hre.ignition.deploy(VDStorageModule);

  const storageAddress = await VDStorage.getAddress();

  const { VDQuadratic } = await hre.ignition.deploy(VDQuadraticModule, {
    parameters: { VDQuadratic: { tokenAddress, storageAddress} },
  });

  const { VDRegular } = await hre.ignition.deploy(VDRegularModule, {
    parameters: { VDRegular: { tokenAddress, storageAddress} },
  });

  const { VDRanked } = await hre.ignition.deploy(VDRankedModule, {
    parameters: { VDRanked: {  storageAddress} },
  });

  console.log(`Token deployed to: ${tokenAddress}`);
  console.log(`VDStorage deployed to: ${storageAddress}`);
  console.log(`VDTSale deployed to: ${await VDTSale.getAddress()}`);
  console.log(`VDQuadratic deployed to: ${await VDQuadratic.getAddress()}`);
  console.log(`VDRegular deployed to: ${await VDRegular.getAddress()}`);
  console.log(`VDRanked deployed to: ${await VDRanked.getAddress()}`);
}

main().catch(console.error);