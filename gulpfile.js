var gulp = require('gulp');
var gnf = require('gulp-npm-files');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();

gulp.task('copyNpmDependenciesOnly', function() {
  gulp.src(gnf(), {base:'./'}).pipe(gulp.dest('./docs'));
});

gulp.task('css', function(){
	return gulp.src('src/sass/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('docs/css'))
		.pipe(browserSync.stream())
});

gulp.task('images', function(){
	return gulp.src('src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('docs/images'))
});

gulp.task('copy', function(){
	return gulp.src('src/*.html')
		.pipe(gulp.dest('docs'))
		.pipe(browserSync.stream())
});

gulp.task('browserSync', function(){
	browserSync.init({
		server: {
			baseDir: 'docs'
		}
	})
});

gulp.task('watch', ['browserSync', 'css', 'copyNpmDependenciesOnly'], function(){
	gulp.watch('src/sass/**/*.scss', ['css']);
	gulp.watch('src/*.html', ['copy']);
});
