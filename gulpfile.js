

//载入gulp模块
var gulp=require("gulp");
var less=require("gulp-less");
var autoprefixer=require("gulp-autoprefixer");
var cssnano=require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin=require('gulp-htmlmin')
var browserSync = require('browser-sync');
var reload=browserSync.reload;
//注册样式编译任务 样式表编译 压缩 --合并没有biyao
gulp.task("style",function(){
	gulp.src(['src/css/*.less','!src/css/_*.less'])
		.pipe(less())
		.pipe(cssnano())
		.pipe(gulp.dest('dist/css'))
		.pipe(reload({
      stream: true
    }));
})
//js 合并 压缩 混淆
gulp.task('script', function() {
  gulp.src('src/scripts/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(reload({
      stream: true
    }));
    
});

//图片复制
gulp.task('img',function(){
	gulp.src('src/image/*.*')
		.pipe(gulp.dest('dist/image'))
		.pipe(reload({
      stream: true
    }));
})

gulp.task('html',function(){
	gulp.src('src/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('dist'))
		.pipe(reload({
    	stream:true
    }))
})

gulp.task('serve',function(){
	browserSync({
		server:{baseDir:['dist']},
		port: 2015,
	})
	gulp.watch('src/css/*.less',['style']);
	gulp.watch('src/scripts/*.js',['script']);
	gulp.watch('src/image/*.*',['img']);
	gulp.watch('src/*.html',['html']);

})

