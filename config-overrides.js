/** @format */
const path = require('path');
const resolve = dir => path.resolve(__dirname, dir);

module.exports = function override(config, env) {
    console.log('4 config', config);
    config.resolve.alias['@'] = resolve('./src');
    config.resolve.alias['@styles'] = resolve('./src/styles');
    //do stuff with the webpack config...
    return config;
};
