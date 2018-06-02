/**
 * @file config/test.env.js
 * @desc 定义测试环境
 * @version 1.0.0
 * @author luoxiaochuan <lxchuan12@163.com>
 * @date 2018-06-02
 * @copyright 2018
 */
'use strict'
const merge = require('webpack-merge');
const devEnv = require('./dev.env');

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"'
});