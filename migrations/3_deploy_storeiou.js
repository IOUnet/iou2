const StoreIOUs = artifacts.require("StoreIOUs");


module.exports = async function (deployer) {
  deployer.deploy(StoreIOUs);
};
