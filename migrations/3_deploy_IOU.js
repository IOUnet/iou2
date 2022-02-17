const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const IOUtoken = artifacts.require("IOUtoken");
/** */
module.exports = async  function (deployer,  _network, addresses) {
  //const iIOUold = await IOUtoken.deployed();
 // console.log("iIOUold", iIOUold.address)
 // const iIOU = await deployProxy(IOUtoken, { deployer });
  await deployer.deploy(IOUtoken);
  const iIOU = await IOUtoken.deployed();
  console.log("iIOU", iIOU.address)
  await iIOU.initialize();
};
/**
 *  upgradable deploys 
     upgrade branch https://forum.openzeppelin.com/t/openzeppelin-upgrades-step-by-step-tutorial-for-truffle/3579
    docs: https://docs.openzeppelin.com/upgrades-plugins/1.x/  
 */
