/**
 * @file config/dev.env.js
 * @desc 定义开发环境
 * @version 1.0.0
 * @author luoxiaochuan <lxchuan12@163.com>
 * @date 2018-06-02
 * @copyright 2018
 */
'use strict'
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
});