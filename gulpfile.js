const { src, dest, parallel } = require('gulp');
const cleanCss = require('gulp-clean-css');
const minHtml = require('gulp-htmlmin');
const minImg = require('gulp-tinypng-extended');
const minScripts = require('gulp-uglify');
const renameFiles = require('gulp-rename');

function minifyCss(){
  return src('src/css/*.css')
    .pipe(cleanCss({compatibility: 'ie9'}))
    .pipe(renameFiles(function (path) {
      path.extname = ".min.css";
    }))
      .pipe(dest('dist/css/'));
}

function htmlmin(){
  return src('src/*.html')
    .pipe(minHtml({ collapseWhitespace: true }))
    .pipe(dest('dist'));
}

function moveFonts(){
  return src('src/fonts/**/*')
    .pipe(dest('dist/fonts/'));
}

function tinypng() {
  return src('src/img/**/*.{png,jpg,jpeg}')
  .pipe(minImg({
      key: 'RCMq5VYDsKdBJxhgKxWwHpt9tFqKk0j8'
  }))
  .pipe(dest('dist/img/'));
}

exports.build = parallel(minifyCss, htmlmin, moveFonts, tinypng);