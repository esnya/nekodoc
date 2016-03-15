/* eslint node/no-unpublished-require: "off" */
'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');

gulp.task('default', ['build', 'lint']);
gulp.task('watch', () => {
    gulp.watch('src/**/*.js', ['build']);
    gulp.watch(['src/**/*.js', 'gulpfile.js', '.eslintrc.yml'], ['lint']);
});

gulp.task('build', () =>
    gulp.src('src/**/*.js')
        .pipe(plumber({onError: notify.onError({
            title: 'Build Error',
            message: '<%= error %>',
        })}))
        .pipe(babel())
        .pipe(gulp.dest('lib'))
);

gulp.task('lint', () =>
    gulp.src(['src/**/*.js', 'gulpfile.js'])
        .pipe(plumber({onError: notify.onError({
            title: 'Lint Error',
            message: '<%= error %>',
        })}))
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
);
