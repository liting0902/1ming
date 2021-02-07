const path = require('path');
const {
    merge
} = require('webpack-merge');
const commonConfig = require('./webpack.config.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCdnPlugin = require('webpack-cdn-plugin');

module.exports = (env) => {
    let config = {
        entry: { 
            index : './pages/index/index.js',
        },
        output: {
            path: path.resolve(__dirname, 'dist','pages'),
            filename: '[name].bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
                }
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template :'./pages/index/index.htm',
                filename: 'index.bundle.htm',
            }),
            new WebpackCdnPlugin(
                {},{})
        ],

        mode: env.NODE_ENV,
        devServer :{
            contentBase : path.resolve(__dirname,'dist','pages'),
            port:9002,
            compress: true,
            historyApiFallback:{
                index: "/index.bundle.htm" // auto launch site to memory
            },
            open: true
        }

    }
    let mergeConfig = merge(config, commonConfig);
    return mergeConfig;
};