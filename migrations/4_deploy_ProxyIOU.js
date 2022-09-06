const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const ProxyIOU = artifacts.require("ProxyIOU");
const IOUtoken = artifacts.require("IOUtoken");
/** */
module.exports = async  function (deployer,  _network, addresses) {

  const implIOU = await IOUtoken.deployed();

  await deployer.deploy(ProxyIOU, implIOU.address, addresses[0]);
  //.log (await ProxyIOU.deployed());
};
/**
 *  upgradable deploys 
     upgrade branch https://forum.openzeppelin.com/t/openzeppelin-upgrades-step-by-step-tutorial-for-truffle/3579
    docs: https://docs.openzeppelin.com/upgrades-plugins/1.x/  
 */
