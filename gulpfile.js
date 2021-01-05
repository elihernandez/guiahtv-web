// Dependencias
var gulp = require('gulp'),
    concat = require('gulp-concat'),    
    minifycss =require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass');

gulp.task('dev-css', function () {
    gulp.src([
        'src/**/*.scss',
        'src/*.css',
    ])
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 99 versions'],
        cascade: false
    }))
    .pipe(concat('build.css'))
    .pipe(gulp.dest('build/'))
});

gulp.task('prod-css', function () {
    gulp.src([
        'src/**/*.scss',
        'src/*.css',
    ])
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 99 versions'],
        cascade: false
    }))
    .pipe(concat('build.css'))
    .pipe(minifycss())
    .pipe(gulp.dest('build/'))
});
