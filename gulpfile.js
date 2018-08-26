var gulp          = require('gulp'),
	gutil         = require('gulp-util' ),
	sass          = require('gulp-sass'),
	browserSync   = require('browser-sync'),
	concat        = require('gulp-concat'),
	uglify        = require('gulp-uglify'),
	cleancss      = require('gulp-clean-css'),
	autoprefixer  = require('gulp-autoprefixer'),
	notify        = require('gulp-notify');

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: './'
		},
		notify: false,
		open: true
	})
});

gulp.task('styles', function() {
	return gulp.src('./scss/**/*.scss')
	.pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError()))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('./css'))
	.pipe(browserSync.stream())
});

gulp.task('watch', ['styles', 'browser-sync'], function() {
	gulp.watch('./scss/**/*.scss', ['styles']);
	gulp.watch(['./*.html', './**/*.js'], browserSync.reload);
});

gulp.task('default', ['watch']);
