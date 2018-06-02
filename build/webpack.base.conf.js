/**
 * @file build/webpack.dev.conf.js
 * @desc webpack 基本配置文件
 * @version 1.0.0
 * @author luoxiaochuan <lxchuan12@163.com>
 * @date 2018-06-02
 * @copyright 2018
 */
'use strict'
const path = require('path');
const config = require('../config');

function resolve(dir){
	return path.join(__dirname, '..', dir);
}

const createLintingRule = () => ({
    test: /\.js$/,
    loader: 'eslint-loader',
    // 执行顺序，前置，还有一个选项是post是后置
    enforce: 'pre',
    include: [resolve('src')],
    options: {
        formatter: require('eslint-friendly-formatter'),
        emitWarning: !config.dev.showEslintErrorsInOverlay
    }
});
// const config = require('../config');
module.exports = {
	target: 'web',
	entry: {
		app: path.resolve(__dirname, '../src/js/app.js'),
	},
	output: {
		filename: '[name].[hash:7].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: process.env.NODE_ENV === 'production'
			? config.build.assetsPublicPath
			: config.dev.assetsPublicPath
	},
	module: {
		rules: [
			...(config.dev.useEslint ? [createLintingRule()] : []),
			{
				test:/\.js$/,
				use: 'babel-loader',
				include: /src/,          // 只转化src目录下的js
				exclude: /node_modules/  // 排除掉node_modules，优化打包速度
            },
            {
				test: /\.(jpe?g|png|gif|ico)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,    // 小于10000b的图片自动转成base64格式，并且不会存在实体图片
							outputPath: './',   // 图片打包后存放的目录
							name: 'img/[name][hash:7].[ext]',
						}
					}
				]
			},
		]
	},
	resolve: {
		// 别名
		// alias: {
		//     $: './src/jquery.js'
		// },
		 // 省略后缀
		 extensions: ['.js', '.css', '.less', '.json']
	},
	mode: 'none'
};