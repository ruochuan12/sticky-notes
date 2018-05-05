### sticky-notes 便签

[点击预览本项目](https://lxchuan12.github.io/sticky-notes/dist?_blank "点击预览本项目")

其中`master`，`dev`分支是使用`webpack4`构建。[点击查看`dev`分支](https://github.com/lxchuan12/sticky-notes/tree/dev "点击查看`dev`分支")

`gh-pages`分支是使用`gulp`构建。[点击查看`gh-pages`分支](https://github.com/lxchuan12/sticky-notes/tree/gh-pages "点击查看`gh-pages`分支")

[点击查看参考的项目效果](https://webkit.org/demos/sticky-notes?_blank "点击查看参考的项目效果")

#### TODO 功能点

- [x] 1、创建、删除、移动、删除所有便签

- [x] 2、保存到`localstorage`

- [x] 3、清除所有便签

- [x] 4、拖拽范围限制在可视区，并实现上方和左方磁性吸附

#### How to use
`npm install` 安装依赖

`npm install http-server -g` 全局安装启动服务的工具
[http-server npm包地址](https://www.npmjs.com/package/http-server)
`npm run server` 或者 `http-server -p 8300` (可自定义) 启动服务

再新开另一个命令行窗口
`npm run dev` 运行

需要安装`chrome`插件 `LiveReload`配合使用，才能监听文件改动，实时渲染
[插件地址：](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)
为什么这么麻烦？具体可以查看这篇文章：[刷新拜拜～gulp-livereload--需要安装http-server](http://www.cnblogs.com/johnnydan/p/4667905.html)
访问：
`http://localhost:8300/build`

打包发布：`npm run build`


#### 克隆下来，开发过程中可能遇到的问题：
1、`chrome`浏览器有时缓存严重，清空缓存并硬性重新加载。

2、gulp插件可参考：[聂微东-gulp使用小结(一)](http://www.cnblogs.com/Darren_code/p/gulp.html)
