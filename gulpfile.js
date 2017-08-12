var gulp = require('gulp');
var gnf = require('gulp-npm-files');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();

gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
	.pipe(gulp.dest('css'));

gulp.src('node_modules/jquery/dist/jquery.min.js')
	.pipe(gulp.dest('js'));
gulp.src('node_modules/tether/dist/js/tether.min.js')
	.pipe(gulp.dest('js'));
gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.js')
	.pipe(gulp.dest('js'));

gulp.task('css', function(){
	return gulp.src('src/sass/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('css'))
		.pipe(browserSync.stream())
});

gulp.task('images', function(){
	return gulp.src('src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('images'))
});

gulp.task('copy', function(){
	return gulp.src('src/*.html')
		.pipe(gulp.dest(''))
		.pipe(browserSync.stream())
});

gulp.task('browserSync', function(){
	browserSync.init({
		server: {
			baseDir: ''
		}
	})
});

gulp.task('watch', ['browserSync', 'css'], function(){
	gulp.watch('src/sass/**/*.scss', ['css']);
	gulp.watch('src/*.html', ['copy']);
});
