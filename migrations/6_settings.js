const StoreIOUs = artifacts.require("StoreIOUs");
const MakeIOU = artifacts.require("MakeIOU");
const IOUtoken = artifacts.require("IOUtoken");
const ProxyIOU = artifacts.require("ProxyIOU");

const addrs = require('../addresses.json')

const setStoreAddress = async () => {
    const storeInstance = await StoreIOUs.deployed();
    const makeiouInstance = await MakeIOU.deployed();
    const proxyIOUinstance = await ProxyIOU.deployed();
    const iIOU = await IOUtoken.deployed();
    
    await storeInstance.setimplIOU (iIOU.address);
    //await iIOU.setOwner(makeiouInstance.address);
    
    await makeiouInstance.setStore(storeInstance.address)
    await makeiouInstance.setimplement(proxyIOUinstance.address)
/*     console.log("iIOU", iIOU.address)
    const iouimplOld = await proxyIOUinstance.implementation.call()
    console.log ("implementationold:",iouimplOld)
    if (iIOU.address !== iouimplOld) { //upgrading 
        await proxyIOUinstance.upgradeTo(iIOU.address);
        console.log ("implementationNew:", await proxyIOUinstance.implementation.call())

    } */
    //await storeInstance.setFactory(makeiouInstance.address)


    var Curaddresses = require ("../addresses.json");
    const networkId = await web3.eth.net.getId();     
    Curaddresses[networkId].MakeIOU = makeiouInstance.address
    Curaddresses[networkId].ProxyIOU =proxyIOUinstance.address
    Curaddresses[networkId].IOUtoken =iIOU.address
    Curaddresses[networkId].StoreIOUs =storeInstance.address
      let fs = require('fs');
      fs.writeFileSync("./addresses.json", JSON.stringify(Curaddresses), function(err) {
            if (err) {
                console.log(err);
            }
      });
}

module.exports = async function (deployer) {
  await setStoreAddress();
  
};
