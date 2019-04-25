## resolve-psc-package-webpack-plugin

_Resolve psc-packages in Js files directly_

- Before

```purescript
import Data.Maybe (Nothing, Just)
```

- After

```javascript
import { Nothing, Just } from 'purescipt-maybe/Data.Maybe';
```

### Usage

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