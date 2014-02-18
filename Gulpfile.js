var gulp  = require('gulp'),
    mocha = require('gulp-mocha');

gulp.task('test', function () {
    gulp
    .src('test/**.spec.js')
    .pipe(mocha({
        ui: 'bdd'
      })
    );
});

// CI and default are the same for the moment
gulp.task('ci', ['test']);

// Default task
gulp.task('default', ['test']);