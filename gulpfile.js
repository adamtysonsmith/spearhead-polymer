var gulp   = require('gulp');
var jade   = require('gulp-jade');
var sass   = require('gulp-sass');
var del    = require('del');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

var paths = {
  headScripts: [
    './bower_components/webcomponentsjs/webcomponents-lite.min.js'
  ],
  bodyScripts: [
    './public/js/*.js'
  ],
  polymerLib: [
    './bower_components/polymer/polymer.html',
    './bower_components/polymer/polymer-mini.html',
    './bower_components/polymer/polymer-micro.html'
  ]
}

// Clean up old files hanging around
gulp.task('clean', function() {
  return del(['./public/build']);
});

// Main Styles and Scripts
gulp.task('main-styles', function() {
  gulp.src('./public/sass/main.scss')
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(concat('styles.css'))
  .pipe(gulp.dest('./public/build'));
});

gulp.task('head-scripts', function() {
  gulp.src(paths.headScripts)
  .pipe(concat('head-scripts.js'))
  .pipe(gulp.dest('./public/build'));
});

gulp.task('body-scripts', function() {
  gulp.src(paths.bodyScripts)
  .pipe(concat('body-scripts.js'))
  .pipe(gulp.dest('./public/build'));
});

// Polymer Stuff
gulp.task('polymer', function() {
  gulp.src(paths.polymerLib)
  .pipe(gulp.dest('./public/build'));
});

gulp.task('polymer-components', function() {
  gulp.src('./elements/*/*.jade')
  .pipe(jade())
  .pipe(concat('elements.html'))
  .pipe(gulp.dest('./public/build'));
});

gulp.task('component-styles', function() {
  gulp.src('./elements/*/*.scss')
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
  'polymer',
  'polymer-components',
  'component-styles'
]);