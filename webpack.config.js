/**
 * @file webpack.config.js
 * @desc webpack 配置文件
 * @version 0.1.0
 * @author luoxiaochuan <lxchuan12@163.com>
 * @date 2018-05-01
 * @copyright 2018
 */
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 拆分css webpack 4 安装 cnpm i extract-text-webpack-plugin@next -D
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
// JS压缩插件
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const config = {
    target: 'web',
    entry: path.resolve(__dirname, './src/js/app.js'),
    output: {
        filename: 'bundle.[hash:6].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    // 将css用link的方式引入就不再需要style-loader了
                    use: [
                        // {
                        //     loader: 'style-loader',
                        // },
                        {
                            loader: 'css-loader',
                            options:{
                                minimize: true //css压缩
                            }
                        },
                        {
                            loader: 'postcss-loader',
                        }
                    ]
                })
                
            },
            {
                test: /\.(jpe?g|png|gif|ico)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,    // 小于8k的图片自动转成base64格式，并且不会存在实体图片
                            outputPath: './',   // 图片打包后存放的目录
                            name: '[name].[ext]',
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
         extensions: ['.js', '.json', '.css']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new HtmlWebpackPlugin({
            // 配置输出文件名和路径
            filename: 'index.html',
            // 配置文件模板
            template: './src/index.html',
            hash: true, // 会在打包好的bundle.js后面加上hash串
        }),
        // 拆分后会把css文件放到dist目录下的css/style.css
        new ExtractTextWebpackPlugin('css/style.css'),
        // 去除console.log 与webpack 4 不兼容
        // new webpack.optimize.minimize({
        //     compress:{
        //         warnings: false,
        //         drop_debugger: true,
        //         drop_console: true
        //     }
        // }),
        // JS压缩
        new UglifyjsWebpackPlugin()
    ],
    mode: 'none'
};

if(isDev){
    config.devtool = '#cheap-module-eval-source-map';
    config.devServer = {
        contentBase: './dist',
        host: '0.0.0.0',      // 默认是localhost ,ip地址也能访问
        port: 1200,             // 端口
        // open: true,             // 自动打开浏览器
        hot: true,               // 开启热更新
        overlay: {
            errors: true,
            warning: true,
        }
    };
    config.plugins.push(
        // 热替换，热替换不是刷新
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    );
}else{
    config.output.filename = 'bundle.[chunkHash:6].js';
    // 每次构建前先清除dist目录原有文件
    config.plugins.unshift(
        new CleanWebpackPlugin('dist'),
    );
}

console.log('是否是开发环境', isDev);


module.exports = config;