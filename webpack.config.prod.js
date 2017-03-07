var path = require('path');
var webpack = require('webpack');
var jsonImporter = require('node-sass-json-importer');

module.exports = {
    devtool: 'source-map',
    entry: [
        'eventsource-polyfill', // necessary for hot reloading with IE
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.ProvidePlugin({
            'Promise': 'es6-promise', // Thanks Aaron (https://gist.github.com/Couto/b29676dd1ab8714a818f#gistcomment-1584602)
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    ],
    module: {
        loaders: [{
            test: /\.scss$/,
            use: ["style-loader", "css-loader", "sass-loader"]
        }, {
            test: /\.jsx?/,
            use: ['babel-loader'],
            include: path.join(__dirname, 'src')
        }]
    }
};
