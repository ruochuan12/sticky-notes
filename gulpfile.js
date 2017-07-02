// @name:'gulpfile.js'
// @author:'轩辕Rowboat'
// @time:'2017.07.02'

// gulp插件可参考：[聂微东-gulp使用小结(一)](http://www.cnblogs.com/Darren_code/p/gulp.html)
// [刷新拜拜～gulp-livereload--需要安装http-server](http://www.cnblogs.com/johnnydan/p/4667905.html)
var gulp = require('gulp'),
    // 使用gulp-load-plugins管理插件,不需要一一引入
	$    = require('gulp-load-plugins')();

// 路径
var app = {
    srcPath: './src/',
    devPath: './build/',
    prdPath: './dist/'
};

// html
gulp.task('html', function () {
    gulp.src(app.srcPath + '**/*.html')
        .pipe($.plumber())
        .pipe(gulp.dest(app.devPath))
        .pipe($.livereload());
    // .pipe(gulp.dest(app.prdPath));
});
// css
gulp.task('css', function () {
    gulp.src(app.srcPath + 'style/**/*.css')
        .pipe($.plumber())
        .pipe(gulp.dest(app.devPath + 'css'))
        .pipe($.livereload());
});
// image
gulp.task('image', function () {
    gulp.src(app.srcPath + 'img/**/*')
        .pipe($.plumber())
        .pipe(gulp.dest(app.devPath + 'img'))
        .pipe($.livereload());
});
// js
gulp.task('js', function () {
    gulp.src(app.srcPath + '/js/**/*.js')
        .pipe($.plumber())
        .pipe(gulp.dest(app.devPath + 'js'))
        .pipe($.livereload());
});
// server
gulp.task('server', function () {
    $.livereload.listen({
        start: true,
        basePath: app.devPath
    });
    gulp.watch(app.srcPath + '**/*.html', ['html']);
    gulp.watch(app.srcPath + 'style/**/*.css', ['css']);
    gulp.watch(app.srcPath + 'js/**/*.js', ['js']);
    gulp.watch(app.srcPath + 'img/**/*', ['image']);
});
// clean
gulp.task('clean', function () {
    gulp.src([app.devPath, app.prdPath])
        .pipe($.clean());
});
gulp.task('build',['html','css','image','js']);
gulp.task('default', ['build']);