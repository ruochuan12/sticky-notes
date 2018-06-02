/**
 * @file build/utils.js
 * @desc webpack 一些工具函数
 * @version 1.0.0
 * @author luoxiaochuan <lxchuan12@163.com>
 * @date 2018-06-02
 * @copyright 2018
 */
'use strict'
const path = require('path');
// 引入配置文件config/index.js
const config = require('../config');
const packageConfig = require('../package.json');

exports.createNotifierCallback = () => {
    const notifier = require('node-notifier');
  
    return (severity, errors) => {
      if(severity !== 'error'){
          return;
      };
  
      const error = errors[0];
      const filename = error.file && error.file.split('!').pop();
  
      notifier.notify({
        title: packageConfig.name,
        message: severity + ': ' + error.name,
        subtitle: filename || '',
        icon: path.join(__dirname, 'logo.png')
      });
    };
};

// 返回路径
exports.assetsPath = function (_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production'
        // 二级目录 这里是 static
        ? config.build.assetsSubDirectory
        // 二级目录 这里是 static
        : config.dev.assetsSubDirectory

    // 生成跨平台兼容的路径
    // 更多查看Node API链接：https://nodejs.org/api/path.html#path_path_posix
    return path.posix.join(assetsSubDirectory, _path);
}