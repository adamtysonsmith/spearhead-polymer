var gulp   = require('gulp');
var jade   = require('gulp-jade');
var sass   = require('gulp-sass');
var del    = require('del');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

var paths = {
  headScripts: [
    './public/bower_components/webcomponentsjs/webcomponents-lite.min.js'
  ],
  bodyScripts: [
    './public/js/*.js'
  ]
}

// Clean up before build
gulp.task('clean', function() {
  return del(['./public/build']);
});

// Main Styles and Scripts
gulp.task('main-styles', function() {
  return gulp.src('./public/sass/app.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./public/build'));
});

gulp.task('head-scripts', function() {
  return gulp.src(paths.headScripts)
    .pipe(concat('head-scripts.js'))
    .pipe(gulp.dest('./public/build'));
});

gulp.task('body-scripts', function() {
  return gulp.src(paths.bodyScripts)
    .pipe(concat('body-scripts.js'))
    .pipe(gulp.dest('./public/build'));
});

// Polymer Stuff
gulp.task('polymer-imports', function() {
  return gulp.src('./elements/imports.html')
    .pipe(gulp.dest('./public/build'));
});

gulp.task('polymer-components', function() {
  return gulp.src('./elements/*/*.jade')
    .pipe(jade())
    .pipe(concat('elements.html'))
    .pipe(gulp.dest('./public/build'));
});

gulp.task('component-styles', function() {
  return gulp.src('./elements/*/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename(function(path) {
      return path;
    }))
    .pipe(gulp.dest('./elements'));
});

gulp.task('default', [
  'clean',
  'main-styles',
  'head-scripts',
  'body-scripts',
  'polymer-imports',
  'polymer-components',
  'component-styles'
]);