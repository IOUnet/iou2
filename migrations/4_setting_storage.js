const StoreIOUs = artifacts.require("StoreIOUs");
const MakeIOU = artifacts.require("MakeIOU");

const setStoreAddress = async () => {
    const storeInstance = await StoreIOUs.deployed();
    const makeiouInstance = await MakeIOU.deployed();
    console.log('STORE INSTANCE:', storeInstance.address)
    await makeiouInstance.setStore(storeInstance.address)
    //await storeInstance.setFactory(makeiouInstance.address)

}

module.exports = async function (deployer) {
  await setStoreAddress();
  
};
