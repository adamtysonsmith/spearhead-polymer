var gulp   = require('gulp');
var jade   = require('gulp-jade');
var sass   = require('gulp-sass');
var concat = require('gulp-concat');
var del    = require('del');

var paths = {
  headScripts: [
    './bower_components/webcomponentsjs/webcomponents-lite.min.js'
  ],
  bodyScripts: [
    './public/js/*.js'
  ],
  stylesheets: [
    './public/sass/main.scss'
  ],
  polymerLib: [
    './bower_components/polymer/polymer.html',
    './bower_components/polymer/polymer-mini.html',
    './bower_components/polymer/polymer-micro.html'
  ],
  polymerComponents: [
    './elements/*/*.jade'
  ]
}

gulp.task('clean', function() {
  return del(['./public/build']);
});

gulp.task('styles', function() {
  gulp.src(paths.stylesheets)
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

gulp.task('polymer', function() {
  gulp.src(paths.polymerLib)
  .pipe(gulp.dest('./public/build'));
});

gulp.task('polymer-components', function() {
  gulp.src(paths.polymerComponents)
  .pipe(jade())
  .pipe(concat('elements.html'))
  .pipe(gulp.dest('./public/build'));
});

gulp.task('default', [
  'clean',
  'styles',
  'head-scripts',
  'body-scripts',
  'polymer',
  'polymer-components'
]);