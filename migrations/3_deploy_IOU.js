const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const IOUtoken = artifacts.require("IOUtoken");
/** */
module.exports = async  function (deployer,  _network, addresses) {

 // const iIOU = await deployProxy(IOUtoken, { deployer });
  await deployer.deploy(IOUtoken);
  const iIOU = await IOUtoken.deployed();
  await iIOU.initialize();
};
/**
 *  upgradable deploys 
     upgrade branch https://forum.openzeppelin.com/t/openzeppelin-upgrades-step-by-step-tutorial-for-truffle/3579
    docs: https://docs.openzeppelin.com/upgrades-plugins/1.x/  
 */
