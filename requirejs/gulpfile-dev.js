// 加载gulp，并结构需要的方法
let { task, src, dest, watch, series, parallel } = require('gulp')
let load = require('gulp-load-plugins')()
let del = require('del') //删除文件

// 删除dist目录
task('delDist', async() => {
    await del('./dist')
})

// 处理html
task('html', async() => {
    src('./views/*.html')
        .pipe(dest('./dist'))
        .pipe(load.connect.reload())
})

// 处理css
task('style', async() => {
    src('./css/*.css')
        .pipe(dest('./dist/style'))
        .pipe(load.connect.reload())
})

// 处理json数据
task('json', async() => {
    src('./json/*.*')
        .pipe(dest('./dist/json'))
})

// 处理data数据
task('data', async() => {
    src('./data/*.*')
        .pipe(dest('./dist/data'))
})

// 处理文字
task('font', async() => {
    src('./font/**')
        .pipe(dest('./dist/font'))
})

// 处理JD文字
task('JDfont', async() => {
    src('./JDfont/**')
        .pipe(dest('./dist/JDfont'))
})



// 处理img
task('image', async() => {
    src('./images/*.*')
        .pipe(dest('./dist/images'))
        .pipe(load.connect.reload())
})

//导入模块插件，jq，re
task('lib', async() => {
    src('./lib/**')
        .pipe(dest('./dist/lib'))
})

// 处理js

task('script', async() => {
    src('./js/*.js')
        .pipe(dest('./dist/script'))
        .pipe(load.connect.reload())
})

// 启动一个服务，实现自动刷新
task('reload', async() => {
    load.connect.server({
        root: './dist', //设置根目录
        livereload: true //开启自动刷新
    })
})

// 监听文件变化
task('watch', async() => {
    watch('./views/*.html', series('html'))
    watch('./style/*.css', series('style'))
    watch('./script/*.js', series('script'))
    watch('./images/*.*', series('image'))
})

// 打包（开发环境）
task('dev', series('delDist', 'style', 'json', 'data', 'font', 'JDfont', 'lib', 'image', 'html', 'script'))

// 启动项目
task('start', series('dev', 'reload', 'watch'))