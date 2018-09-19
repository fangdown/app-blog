## gulp

### 安装
全局安装 npm i gulp -g
### 使用
- 引入依赖包
- 针对不同类型的文件进行打包
- 生成版本号
- 替代版本号
- 删除已有文件
- 动态监听变化（变更前要删除）


```js
//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    less = require('gulp-less'), // 编译成css
    uglify = require('gulp-uglify'), // 压缩js
    imageMin = require('gulp-imagemin'), //压缩图片
    rev = require('gulp-rev'), //生成版本号
    revCollector = require('gulp-rev-collector'), //替换版本号
    clean = require('gulp-clean'); //清空文件夹
//定义一个testLess任务（自定义任务名称）
gulp.task('testLess', function () {
    gulp.src('src/less/index.less') //该任务针对的文件
        .pipe(rev()) //生成版本号
        .pipe(revCollector()) //生成版本号
        .pipe(less()) //该任务调用的模块
        .pipe(gulp.dest('dist/css')); //将会在src/css下生成index.css
});
gulp.task('testJs',['cleanJs'], function () {
    gulp.src('src/js/*.js') //该任务针对的文件
        .pipe(rev()) //生成版本号
        .pipe(revCollector()) //生成版本号
        .pipe(uglify({ mangle: false })) //该任务调用的模块
        .pipe(gulp.dest('dist/js')); //将会在src/css下生成index.css
});
gulp.task('image',function(){
    gulp.src('images/*.*')
        .pipe(rev()) //生成版本号
        .pipe(revCollector()) //生成版本号
        .pipe(imageMin({progressive: true}))
        .pipe(gulp.dest('dist/images'))
})
gulp.task('auto',function(){
   gulp.watch('src/js/*.js',['testJs']);
})

gulp.task("clean", function(){
    return gulp.src('./dist')
        .pipe(clean());
})
gulp.task("cleanJs", function(){
    return gulp.src('./dist/js')
        .pipe(clean());
})

//清空文件夹
gulp.task('default', ['clean'], function(){
    gulp.start('testLess', 'auto', 'testJs', 'image')
}) //定义默认任务

//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径

```