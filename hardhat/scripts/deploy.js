const fs = require('fs');

/*
 * This script deploys the VoteDapp contracts to the network specified in the hardhat.config.js file.
 * It then writes the contract addresses and ABIs to the contract_data.json file in the src directory, 
 * which is used by the frontend.
 */

/*
 * NOTE: I tried to optimize the deployment script by making multiple async calls
 * and then awaiting their promises later, however, I kept ending up with the error:
 * Invariant violated: neither timeouts or failures
 * I am not sure why this is happening, but I suspect it has to do with the fact that
 * making multiple async calls to initiate transactions at once without letting them 
 * complete causes timeout issues
 */

const { network } = require('hardhat');

const VDTSaleModule = require("../ignition/modules/VoteDappTokenSale");
const VDQuadraticModule = require("../ignition/modules/VoteDappQuadratic");
const VDRegularModule = require("../ignition/modules/VoteDappRegular");
const VDRankedModule = require("../ignition/modules/VoteDappRanked");
const VDStorageModule = require("../ignition/modules/VoteDappStorage");

const ONE_GWEI = 1_000_000_000n;

const GAS_PRICE_UPPER_LIMIT = 0.8;
const GAS_PRICE_CHECK_INTERVAL_MS = 10000;
const ENABLE_GAS_PRICE_CHECK = false;

async function waitGasPriceUpperLimit() {
  console.log(`Waiting for gas price to drop below ${GAS_PRICE_UPPER_LIMIT}...`);
  console.log(`Checking every ${GAS_PRICE_CHECK_INTERVAL_MS} ms`);

  do {
    await new Promise(r => setTimeout(r, GAS_PRICE_CHECK_INTERVAL_MS));
    
    let gasPriceWei = parseInt(await network.provider.send('eth_gasPrice'));
    
    gasPrice = ethers.formatUnits(gasPriceWei, 'gwei');
    console.log(`Gas price: ${gasPrice} gwei`);
    
  } while (gasPrice > GAS_PRICE_UPPER_LIMIT);
}

async function deploy(contractModule, parameters) {
  if (ENABLE_GAS_PRICE_CHECK) {
    await waitGasPriceUpperLimit();
  }

  let contract = await hre.ignition.deploy(contractModule, parameters || {});

  return contract;
}

async function main() {

  const tokenPrice = ONE_GWEI;

  const { VDTSale } = await deploy(VDTSaleModule, { parameters: { VDTSale: { tokenPrice } } });
  console.log("VDTSale deployed");
  const tokenAddress = await VDTSale.getAddress();

  const { VDStorage } = await deploy(VDStorageModule);
  console.log("VDStorage deployed");
  const storageAddress = await VDStorage.getAddress();

  const { VDQuadratic } = await deploy(VDQuadraticModule, { parameters: { VDQuadratic: { tokenAddress, storageAddress} }});
  console.log("VDQuadratic deployed");
  const VDQAddress = await VDQuadratic.getAddress();

  const { VDRegular } = await deploy(VDRegularModule, { parameters: { VDRegular: { tokenAddress, storageAddress} }});
  console.log("VDRegular deployed");
  const VDRAddress = await VDRegular.getAddress();

  const { VDRanked } = await deploy(VDRankedModule, { parameters: { VDRanked: {storageAddress} }});
  console.log("VDRanked deployed");
  const VDRankedAddress = await VDRanked.getAddress();

  if (ENABLE_GAS_PRICE_CHECK) {
    await waitGasPriceUpperLimit();
  }
  VDStorage.addPollType([VDQAddress, VDRAddress, VDRankedAddress]);
  console.log("Poll types added to VDStorage");

  const chainID = parseInt(await network.provider.send('eth_chainId'));
  
  let contract_data = {
    networkID: chainID,
    VoteDappToken: {
      address: tokenAddress,
      abi: await getContractABI("VoteDappToken"),
    },
    VoteDappStorage: {
      address: storageAddress,
      abi: await getContractABI("VoteDappStorage"),
    },
    VoteDappQuadratic: {
      address: VDQAddress,
      abi: await getContractABI("VoteDappQuadratic"),
    },
    VoteDappRegular: {
      address: VDRAddress,
      abi: await getContractABI("VoteDappRegular"),
    },
    VoteDappRanked: {
      address: VDRankedAddress,
      abi: await getContractABI("VoteDappRanked"),
    },
  };

  
  fs.readFile('../src/contract_data.json', 'utf8', (err, data) => {
    let jsonData = { networkID: {} };
    if (!err) {
      jsonData = JSON.parse(data);
      //if there is an error, the file probbly doesn't exist, so we will just use the default jsonData
    }
    
    jsonData.networkID[chainID] = contract_data;
  
    jsonData = JSON.stringify(jsonData);

    fs.writeFile('../src/contract_data.json', jsonData, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('JSON data has been written to /src/contract_data.json');
      }
    });
  });
  

  console.log(`VDTSale deployed to: ${tokenAddress}`);
  console.log(`VDStorage deployed to: ${storageAddress}`);
  console.log(`VDQuadratic deployed to: ${VDQAddress}`);
  console.log(`VDRegular deployed to: ${VDRAddress}`);
  console.log(`VDRanked deployed to: ${VDRankedAddress}`);
}

const getContractABI = async (contractName) => {
  const artifact = await hre.artifacts.readArtifact(contractName);
  return artifact.abi;
}

main().catch(console.error);