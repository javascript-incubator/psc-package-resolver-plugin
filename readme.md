## psc-package-resolver-plugin

_Resolve psc-packages in Js files directly_

<p>
  <a href="https://github.com/prettier/prettier">
        <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg" alt="prettier"/>
  </a>
  <a href="https://travis-ci.org/rajatsharma/psc-package-resolver-plugin">
        <img src="https://travis-ci.org/rajatsharma/psc-package-resolver-plugin.svg?branch=master" alt="travis"/>
  </a>
</p>

#### Install

```bash
$ yarn add @arcana/psc-package-resolver-plugin
```

- Before (_Purescript_)

```purescript
import Data.Maybe (Nothing, Just)
```

- After (_Javascript_)

```javascript
import { Nothing, Just } from 'purescipt-maybe/Data.Maybe';
```

#### Usage

- Requires `purs-loader` to work.

```javascript
[
  {
    test: /\.purs$/,
    loader: require.resolve('purs-loader'),
    exclude: /node_modules/,
    query: {
      psc: 'psa',
      src: ['src/**/*.purs', '.psc-package/purescript-*/src/**/*.purs'],
      pscPackage: true,
      bundle: options.env !== 'development',
      watch: options.env === 'development',
    },
  },
];
```

- Add this in webpack config in `resolve.plugins`

```javascript
{
  resolve: {
    plugins: [new PscPackageResolverPlugin()];
  }
}
```
