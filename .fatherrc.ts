import antdTheme from './theme.json';
export default {
  esm: 'rollup',
  cjs: 'rollup',
  lessInRollupMode: {
    modifyVars: antdTheme,
    javascriptEnabled: true,
  },
  cssModules: true,
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
};
