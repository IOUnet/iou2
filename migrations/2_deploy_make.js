const { deployProxy } = require('@openzeppelin/truffle-upgrades');
const MakeIOU = artifacts.require("MakeIOU");
const ProxyIOU = artifacts.require("ProxyIOU");
const IOUtoken = artifacts.require("IOUtoken");
/** */
module.exports = async  function (deployer) {
  await  deployer.deploy(MakeIOU);
  await deployer.deploy(ProxyIOU);
  const mk = await MakeIOU.deployed();
  const prx =  await ProxyIOU.deployed()
  const iIOU = await deployProxy(IOUtoken, { deployer });
  await iIOU.setOwner(mk.address);

  //const instanceMake = await deployProxy(MakeIOU, { deployer });
  //const instanceProxy = await deployProxy(ProxyIOU,  { deployer });
  const networkId = await web3.eth.net.getId();     

  var Curaddresses = require ("../addresses.json");

  Curaddresses[networkId].MakeIOU = mk.address
  Curaddresses[networkId].ProxyIOU =prx.address
  Curaddresses[networkId].IOUtoken =iIOU.address
    let fs = require('fs');
    fs.writeFileSync("./addresses.json", JSON.stringify(Curaddresses), function(err) {
          if (err) {
              console.log(err);
          }
    });
};
/**
 *  upgradable deploys 
     upgrade branch https://forum.openzeppelin.com/t/openzeppelin-upgrades-step-by-step-tutorial-for-truffle/3579
    docs: https://docs.openzeppelin.com/upgrades-plugins/1.x/  
 */
