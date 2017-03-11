var gulp   = require('gulp'),
  concat   = require('gulp-concat'),
  cleanCSS = require('gulp-clean-css'),
  uglify   = require('gulp-uglify'),
  src = 'src/',
  dist = 'dist/';

gulp.task('minify-css', function() {
  return gulp.src(src + 'jquery.nestable.css')
    .pipe(concat('jquery.nestable.min.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(dist));
});

gulp.task('minify-js', function() {
  return gulp.src(src + 'jquery.nestable.js')
    .pipe(concat('jquery.nestable.min.js'))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest(dist));
});

gulp.task('default', function() {
  gulp.run('minify-js', 'minify-css');
})
