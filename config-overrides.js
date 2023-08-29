const { override, addWebpackAlias } = require('customize-cra');
const webpack = require('webpack');
const path = require('path');

module.exports = function override(config, env) {
    // eslint-disable-line no-param-reassign
    config = addWebpackAlias({
        '@': path.resolve(__dirname, 'src'),
    })(config); // Call the returned function with the current config

    config.devtool = 'source-map';

    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        assert: require.resolve('assert'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify'),
        url: require.resolve('url'),
    });
    config.resolve.fallback = fallback;
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    ]);
    if (env === 'development') {
        // Find and remove the ForkTsCheckerWebpackPlugin to disable type checking on 'npm start'
        config.plugins = config.plugins.filter(
            (plugin) => !(plugin.constructor.name === 'ForkTsCheckerWebpackPlugin'),
        );
    }

    return config;
};