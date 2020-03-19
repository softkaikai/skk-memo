/** @format */
const path = require('path');
const resolve = dir => path.resolve(__dirname, dir);

const {override, fixBabelImports, addWebpackAlias} = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
    }),
    // add an alias for "ag-grid-react" imports
    addWebpackAlias({
        ['@']: resolve('./src'),
        ['@styles']: resolve('./src/styles'),
        ['@components']: resolve('./src/components'),
    }),
);
