/* eslint-disable class-methods-use-this  */
/* eslint-disable prefer-destructuring */
const syspath = require('path');
const fs = require('fs-extra');

const rootResolve = (...args) => syspath.resolve(process.cwd(), ...args);

class ResolvePscPackageWebpackPlugin {
  apply(resolver) {
    resolver.getHook('module').tapAsync('ResolvePsmWebpackPlugin', (request, resolverContext, callback) => {
      const { path, request: requestAs } = request;
      if (!requestAs.startsWith('purescript-')) {
        callback();
        return;
      }

      if (!fs.pathExistsSync(syspath.resolve(process.cwd(), 'psc-package.json'))) {
        console.log('psc-package not initialized for this project');
        callback();
        return;
      }

      const set = require(rootResolve('psc-package.json')).set;

      if (!set) {
        console.log('Invalid Set: ', set);
        callback();
        return;
      }

      const [pscpackage, module] = requestAs.split('/');
      const pscPackageMod = pscpackage.split('purescript-')[1];
      const modulePath = module.split('.');
      const resolution = require(rootResolve('.psc-package', set, '.set', 'packages.json'))[modulePath.slice(-1)[0].toLowerCase()].version;

      if (!fs.pathExistsSync(rootResolve('.psc-package', set, pscPackageMod))) {
        console.log('Package not found');
        callback();
        return;
      }

      const withoutFile = modulePath.slice(0, -1);
      const filename = modulePath.slice(-1);

      const obj = Object.assign({}, request, {
        path,
        request: syspath.resolve(process.cwd(), '.psc-package', set, pscPackageMod, resolution, 'src', ...withoutFile, filename[0] + '.purs'),
      });

      resolver.doResolve(resolver.hooks.resolve, obj, 'looking for modules in ' + path, resolverContext, callback);
    });
  }
}

module.exports = ResolvePscPackageWebpackPlugin;
