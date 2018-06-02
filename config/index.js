/**
 * @file config/index.js
 * @desc webpack 配置文件
 * @version 1.0.0
 * @author luoxiaochuan <lxchuan12@163.com>
 * @date 2018-06-02
 * @copyright 2018
 */
'use strict'
const path = require('path');
module.exports = {
	dev: {
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',
		proxyTable: {},
		host: '0.0.0.0',
		port: 1200,
		autoOpenBrowser: false,
		errorOverlay: true,
		notifyOnErrors: true,
		showEslintErrorsInOverlay: false,
		devtool: 'cheap-module-eval-source-map',
		useEslint: true,
	},
	build: {
		index: path.resolve(__dirname, '../dist/index.html'),
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsSubDirectory: 'static',
		assetsPublicPath: './',
		productionSourceMap: true,
		productionCache: true,
		devtool: '#source-map',
		bundleAnalyzerReport: process.env.npm_config_report,
	},
};