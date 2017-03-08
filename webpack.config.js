var path = require('path');
var webpack = require('webpack');
var HappyPack = require('happypack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var happyThreadPool = HappyPack.ThreadPool({
    size: 5
});

function createHappyPlugin(id, loaders) {
  console.log(process.env.HAPPY_CACHE)
    return new HappyPack({
        id: id,
        loaders: loaders,
        threadPool: happyThreadPool,

        // disable happy caching with HAPPY_CACHE=0
        cache: process.env.HAPPY_CACHE === '1',

        // make happy more verbose with HAPPY_VERBOSE=1
        verbose: process.env.HAPPY_VERBOSE === '1',
    });
}

module.exports = {
    devtool: 'eval',
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
        createHappyPlugin('js', ['babel-loader']),
        createHappyPlugin('less', ['style-loader!css-loader']),
        new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    module: {

        loaders: [{
            test: /\.jsx?$/,
            include: [
                path.resolve(__dirname, "src")
            ],
            exclude: [
                path.resolve(__dirname, "node_modules")
            ],
            query: {
              presets: ['react', 'es2015', 'stage-1'],
              plugins: ["transform-decorators-legacy", "react-hot-loader/babel"],
              cacheDirectory: true
            },
            loader: 'babel-loader?id=js'
        }, {
            test: /\.less$/,
            loader: 'style-loader!css-loader!less-loader?id=less'
        }]


        // rules: [{
        //     test: /\.jsx?$/,
        //     include: [
        //         path.resolve(__dirname, "src")
        //     ],
        //     exclude: [
        //         path.resolve(__dirname, "node_modules")
        //     ],
        //     loader: "babel-loader?id=js",
        // }, {
        //     test: /\.less$/,
        //     use: [
        //         'style-loader', {
        //             loader: 'css-loader',
        //             options: {
        //                 importLoaders: 1
        //             }
        //         },
        //         'less-loader?id=less'
        //     ]
        // }]

    }
};



















