const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = {
    context : path.resolve(__dirname,'src'),
    devtool: 'eval-cheap-module-source-map',
    plugins : [
        new CleanWebpackPlugin()
    ],
}