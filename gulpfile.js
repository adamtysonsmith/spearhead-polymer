'use strict';

const gulp   = require('gulp');
const jade   = require('gulp-jade');
const sass   = require('gulp-sass');
const del    = require('del');
const concat = require('gulp-concat');
const rename = require('gulp-rename');

const paths = {
  headScripts: [
    './public/bower_components/webcomponentsjs/webcomponents-lite.min.js'
  ],
  bodyScripts: [
    './public/js/*.js'
  ]
}

// Clean up before build
gulp.task('clean', () => del(['./public/build']));

// Main Styles and Scripts
gulp.task('main-styles', () => {
  return gulp.src('./public/sass/main.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./public/build'));
});

gulp.task('head-scripts', () => {
  return gulp.src(paths.headScripts)
    .pipe(concat('head-scripts.js'))
    .pipe(gulp.dest('./public/build'));
});

gulp.task('body-scripts', () => {
  return gulp.src(paths.bodyScripts)
    .pipe(concat('body-scripts.js'))
    .pipe(gulp.dest('./public/build'));
});

// Polymer Stuff
gulp.task('polymer-imports', () => {
  return gulp.src('./elements/imports.html')
    .pipe(gulp.dest('./public/build'));
});

gulp.task('polymer-components', () => {
  return gulp.src('./elements/*/*.jade')
    .pipe(jade())
    .pipe(concat('elements.html'))
    .pipe(gulp.dest('./public/build'));
});

gulp.task('component-styles', () => {
  return gulp.src('./elements/*/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename(path => path))
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