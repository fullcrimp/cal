var gulp = require('gulp'),
    jscs = require('gulp-jscs'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

gulp.task('css', function() {
    return gulp.src('source/*.css')
        .pipe(gulp.dest('dist'));
});

gulp.task('js', function() {
  return gulp.src('source/*.js')
    .pipe(jscs())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('css-example', function() {
    return gulp.src('source/*.css')
        .pipe(gulp.dest('example'));
});

gulp.task('js-example', function() {
  return gulp.src('source/*.js')
    .pipe(jscs())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('example'));
});



gulp.task('watch', function() {
    gulp.watch('source/*.js', ['js', 'js-example']);
    gulp.watch('source/*.css', ['css', 'css-example']);
});

gulp.task('default', ['js', 'css', 'js-example', 'css-example']);
