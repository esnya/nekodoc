/* eslint node/no-unpublished-require: "off" */
'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const jest = require('jest-cli');

gulp.task('default', ['build', 'test', 'lint']);

gulp.task('build', ['babel']);
gulp.task('test', ['lint', 'jest']);
gulp.task('lint', ['eslint']);

gulp.task('watch', () => {
    gulp.watch(['src/**/*.js', '!src/**/__tests__/**/*.js'], ['babel']);
    gulp.watch(['src/**/*.js'], ['jest']);
    gulp.watch(['src/**/*.js', 'gulpfile.js', '.eslintrc.yml'], ['eslint']);
});

gulp.task('babel', () =>
    gulp.src(['src/**/*.js', '!src/**/__tests__/**/*.js'])
        .pipe(plumber({onError: notify.onError({
            title: 'Build Error',
            message: '<%= error %>',
        })}))
        .pipe(babel())
        .pipe(gulp.dest('lib'))
);

gulp.task('eslint', () =>
    gulp.src(['src/**/*.js', 'gulpfile.js'])
        .pipe(plumber({onError: notify.onError({
            title: 'Lint Error',
            message: '<%= error %>',
        })}))
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
);

gulp.task('jest', (next) =>
    jest.runCLI({}, __dirname, (succeeded) => {
        if (!succeeded) {
            notify
                .onError({title: 'Test Failed'})
                .call(new Buffer([]), new Error('Test Failed'));
            return next('Test Failed');
        }

        return next();
    })
);
