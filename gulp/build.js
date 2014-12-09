'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license']
});

gulp.task('styles', function () {
  return gulp.src('app/styles/*.scss')
    .pipe($.plumber())
    .pipe($.rubySass({style: 'expanded'}))
    .pipe($.autoprefixer('last 2 versions'))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe($.size());
});

gulp.task('scripts', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.size());
});

gulp.task('html', ['styles', 'scripts'], function () {
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');

  return gulp.src('app/*.html')
    .pipe($.useref.assets())
    .pipe($.rev())
    .pipe(jsFilter)
    .pipe($.uglify({mangle: false}))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe($.useref.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(gulp.dest('public'))
    .pipe($.size());
});

gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('public/images'))
    .pipe($.size());
});

gulp.task('fonts', function () {
  return gulp.src('app/fonts/*')
    .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
    .pipe($.flatten())
    .pipe(gulp.dest('public/fonts'))
    .pipe($.size());
});

gulp.task('clean', function () {
  return gulp.src(['.tmp', 'public'], { read: false }).pipe($.rimraf());
});

gulp.task('build', ['html', 'images', 'fonts']);
