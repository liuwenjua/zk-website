'use strict';
var gulp = require('gulp'),
    sequence = require('gulp-sequence'),
    browserSync = require('browser-sync').create(),
    plumber = require('gulp-plumber'),
    zip = require('gulp-zip'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    cssnano = require('gulp-cssnano'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    rimraf = require('gulp-rimraf'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    rename = require('gulp-rename'),
    RevAll = require('gulp-rev-all'),
    base64 = require('gulp-base64');

var middlewares = [];

gulp.task('serve', function() {
    browserSync.init({
        port: 7070,
        server: {
            baseDir: ['./src'],
            middleware: middlewares,
            routes: {
                '/node_modules': 'node_modules'
            }
        },
        startPath: '/'
    });

    gulp.watch(['src/**/*.{html,js,css}']).on('change', browserSync.reload);
});

gulp.task('dist', function() {
    browserSync.init({
        port: 7007,
        server: {
            baseDir: ['./dist'],
            middleware: middlewares
        },
        startPath: '/'
    });
});

// css、js concat and minify in index.html
gulp.task('index', function() {
    var revAll = new RevAll({
        dontRenameFile: ['.html'],
        dontUpdateReference: ['.html']
    });

    return gulp.src(['src/index.html', 'src/mobile.html', 'src/html/pc/acquisition.html', 'src/html/pc/artical.html', 'src/html/pc/conversion.html', 'src/html/pc/creative.html', 'src/html/pc/health.html', 'src/html/pc/idea.html', 'src/html/pc/industry.html', 'src/html/pc/information.html', 'src/html/pc/operate.html', 'src/html/pc/partner.html', 'src/html/pc/practice.html', 'src/html/pc/resources.html', 'src/html/pc/status.html', 'src/html/pc/team.html','src/html/mobile/acquisition.html', 'src/html/mobile/artical.html', 'src/html/mobile/conversion.html', 'src/html/mobile/creative.html', 'src/html/mobile/health.html', 'src/html/mobile/idea.html', 'src/html/mobile/industry.html', 'src/html/mobile/information.html', 'src/html/mobile/operate.html', 'src/html/mobile/partner.html', 'src/html/mobile/practice.html', 'src/html/mobile/resources.html', 'src/html/mobile/status.html', 'src/html/mobile/team.html'])
        .pipe(plumber())
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        // .pipe(gulpif('*.css', cssnano({
        //     discardComments: {
        //         removeAll: true
        //     },
        //     discardUnused: false,
        //     mergeIdents: false,
        //     reduceIdents: false,
        //     zindex: false
        // })))
        //.pipe(rename({suffix: '.min'}))
        .pipe(revAll.revision())
        .pipe(gulp.dest('dist'));
});

// js syntax check
// gulp.task('jshint', function() {
//     return gulp.src('src/js/**/*.js')
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'));
// });

gulp.task('html', function() {
    gulp.src('src/html/**')
        .pipe(gulp.dest('dist/html/'));
});

// copy
gulp.task('copy', function() {
    gulp.src('src/favicon.ico')
        .pipe(gulp.dest('dist/'));
});

// image minify and cache
gulp.task('image', function() {
    return gulp.src('src/images/**')
        .pipe(cache(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'));
});

// clean
gulp.task('clean', function() {
    return gulp.src(['dist/*'], {
            read: false
        })
        .pipe(rimraf({
            force: true
        }));
});

// publish
gulp.task('publish', function() {
    return gulp.src('dist/**')
        .pipe(plumber())
        .pipe(zip('website.zip'))
        .pipe(gulp.dest('release'))
});

gulp.task('cssnano', function() {
    return gulp.src([
            'src/css/layout.css'
        ])
        .pipe(plumber())
        .pipe(cssnano({
            discardComments: {
                removeAll: true
            },
            discardUnused: false,
            mergeIdents: false,
            reduceIdents: false,
            zindex: false
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('src/css'));
});

/**
 * Replace urls in CSS fies with base64 encoded data
 */
gulp.task('base64', function() {
    return gulp.src('src/css/custom.css')
        .pipe(base64({
            baseDir: 'src',
            extensions: ['svg', 'png', /\.jpg#datauri$/i],
            exclude: [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
            maxImageSize: 8 * 1024, // bytes 
            debug: true
        }))
        .pipe(rename({
            suffix: '.b64'
        }))
        .pipe(gulp.dest('src/css'));
});

// register tasks
gulp.task('default', ['serve']);

gulp.task('build', sequence('clean', ['index', 'image', 'copy'], 'dist'));
