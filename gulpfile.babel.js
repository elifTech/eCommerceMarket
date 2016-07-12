var lr = require('tiny-lr'),
    commonjs = require('rollup-plugin-commonjs'),
    resolve = require('rollup-plugin-node-resolve'),
    rollup = require('gulp-rollup'),
    gulp = require('gulp'),
    babel = require('gulp-babel'),
    ngjson = require('gulp-ng-json'),
    server = lr();

function build() {
    return gulp.src("app/app.js", {read: false})
        .pipe(rollup({
            sourceMap: true,
            plugins: [resolve({jsnext: true}), commonjs()]
        }))
        .pipe(babel({presets: ['es2015']}))
        .pipe(gulp.dest('build/'));
}

gulp.task('build', build);

gulp.task('watch', function() {
    gulp.run('build');

    server.listen(8080, function(err) {
        if (err) return console.log(err);

        gulp.watch('app/**/*', function() {
            gulp.run('build');
        });
    });
});