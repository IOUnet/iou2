const StoreIOUs = artifacts.require("StoreIOUs");
const MakeIOU = artifacts.require("MakeIOU");
const IOUtoken = artifacts.require("IOUtoken");
const addrs = require('../addresses.json')

const setStoreAddress = async () => {
    const storeInstance = await StoreIOUs.deployed();
    const makeiouInstance = await MakeIOU.deployed();
    const instIOU = await IOUtoken.deployed();
    console.log('STORE INSTANCE:', storeInstance.address)
    await makeiouInstance.setStore(storeInstance.address)
    await makeiouInstance.setIOU(instIOU.address)
    //await storeInstance.setFactory(makeiouInstance.address)

}

module.exports = async function (deployer) {
  await setStoreAddress();
  
};
