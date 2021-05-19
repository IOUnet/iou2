const MakeIOU = artifacts.require("MakeIOU");

module.exports = function (deployer) {
  deployer.deploy(MakeIOU);
};
