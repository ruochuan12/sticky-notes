### sticky-notes 便签
[效果参考地址](https://webkit.org/demos/sticky-notes/)

其他遇到的问题：
gulp插件可参考：[聂微东-gulp使用小结(一)](http://www.cnblogs.com/Darren_code/p/gulp.html)
已经把文件提交到`git`，如何再添加到`.gitignore`，一定要删除？(遗留其他问题)
`chrome`浏览器有时缓存严重，清空缓存并硬性重新加载。

// TODO

- [x] 1、创建、删除、移动、删除所有便签

- [x] 2、保存到`localstorage`

- [x] 3、`z-index`、时间存储还有点问题

#### How to use
`npm install` 安装依赖

`npm install http-server -g` 全局安装启动服务的工具
[http-server npm包地址](https://www.npmjs.com/package/http-server)
`http-server -p 8300` (可自定义) 启动服务

`npm run dev` 运行
需要安装`chrome`插件 `LiveReload`配合使用，才能监听文件改动，实时渲染
[插件地址：](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)
为什么这么麻烦？具体可以查看这篇文章：[刷新拜拜～gulp-livereload--需要安装http-server](http://www.cnblogs.com/johnnydan/p/4667905.html)
访问：
`http://localhost:8300/build`

打包发布：`npm run build`