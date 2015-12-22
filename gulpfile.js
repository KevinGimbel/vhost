/*
 * Loading the modules we neeed.
*/
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var prefix = require('gulp-autoprefixer');

var path = {
  src: {
    sass: './src/sass',
    js: './src/js'
  },
  dest: {
    css: './assets/css',
    js: './assets/js'
  }
}


/* super-easy sass task using gulp-sass and compiling with node-sass and Libsass. Lightning fast, also! */
gulp.task('sass', function() {
    gulp.src(path.src.sass + '/style.scss')
        .pipe(prefix())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(gulp.dest(path.dest.css));
});

gulp.task('uglify', function() {
    gulp.src(path.src.js + '/main.js')
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest(path.dest.js));
});

gulp.task('watch', function() {
  gulp.watch(path.src.sass + '/**/*.scss', ['sass']);
  gulp.watch(path.src.js + '**/*.js', ['uglify']);
});
gulp.task('default', ['watch', 'sass', 'uglify']);
