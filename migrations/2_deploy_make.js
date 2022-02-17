const { deployProxy } = require('@openzeppelin/truffle-upgrades');
const MakeIOU = artifacts.require("MakeIOU");
/** */
module.exports = async  function (deployer,  _network) {
  await  deployer.deploy(MakeIOU);
  
  /* var Curaddresses = require ("../addresses.json");

  Curaddresses[networkId].MakeIOU = mk.address
  Curaddresses[networkId].ProxyIOU =prx.address
  Curaddresses[networkId].IOUtoken =iIOU.address
    let fs = require('fs');
    fs.writeFileSync("./addresses.json", JSON.stringify(Curaddresses), function(err) {
          if (err) {
              console.log(err);
          }
    }); */
};
/**
 *  upgradable deploys 
     upgrade branch https://forum.openzeppelin.com/t/openzeppelin-upgrades-step-by-step-tutorial-for-truffle/3579
    docs: https://docs.openzeppelin.com/upgrades-plugins/1.x/  
 */
