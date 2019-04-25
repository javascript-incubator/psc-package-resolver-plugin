const PscPackageResolverPlugin = require('./PscPackageResolverPlugin');

module.exports = config => {
  config.resolve.plugins = [new PscPackageResolverPlugin()];
  return config;
};
