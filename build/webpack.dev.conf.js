/**
 * @file build/webpack.dev.conf.js
 * @desc webpack 生成环境配置文件
 * @version 1.0.0
 * @author luoxiaochuan <lxchuan12@163.com>
 * @date 2018-06-02
 * @copyright 2018
 */
'use strict'
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const utils = require('./utils');
const path = require('path');
const baseWebpackConfig = require('./webpack.base.conf');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

const devWebpackConfig = merge(baseWebpackConfig, {
	mode: 'development',
    module: {
        rules: [{
            test: /\.less$/,
            use: [
                {
                    loader: 'style-loader',
                },
                {
                    loader: 'css-loader',
                    // options:{
                    //     minimize: true //css压缩
                    // }
                },
                {
                    loader: 'less-loader'
                },
                {
                    loader: 'postcss-loader',
                }
            ]
        }],
    },
    devtool: config.dev.devtool,
    devServer: {
		// contentBase: './dist',
		clientLogLevel: 'warning',
		historyApiFallback: {
			rewrites: [
				{ from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
			],
		},
		host: HOST || config.dev.host,
        port: PORT || config.dev.port,            // 端口
		open: config.dev.autoOpenBrowser,             // 自动打开浏览器
		hot: true,               // 开启热更新
		overlay: config.dev.errorOverlay
            ? { warnings: true, errors: true }
            : false,
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable,
        quiet: true,
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../src/index.html'),
            inject: true
        }),
	],
});

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port;
    portfinder.getPort((err, port) => {
      if(err){
        reject(err);
      } else {
        process.env.PORT = port;
        devWebpackConfig.devServer.port = port;
  
        devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
          },
          onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
        }));
  
        resolve(devWebpackConfig);
      }
    })
});