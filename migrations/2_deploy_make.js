const MakeIOU = artifacts.require("MakeIOU");
const ProxyIOU = artifacts.require("ProxyIOU");

module.exports = function (deployer) {
  deployer.deploy(MakeIOU);
  deployer.deploy(ProxyIOU);
};
