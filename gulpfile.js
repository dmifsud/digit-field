var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({pattern: ['gulp-*']}),
    packagejson = require('./package.json'),
    runSequence = require('run-sequence'),
    addStream = require('add-stream'),
    angularTemplateCache = require('gulp-angular-templatecache');

var prepareTemplates = function(){
  return gulp.src('src/templates/**/*.html')
    .pipe(angularTemplateCache());
};

gulp.task('js', function(){
  var minifiedVersion = "digit.field.min.js";

  return gulp.src('src/*.js')
  .pipe($.jshint())
  .pipe($.jshint.reporter('jshint-stylish'))
  .pipe($.jshint.reporter('fail'))
  .pipe($.uglify({
            mangle : false,
            preserveComments : "some"
        }))
  .pipe($.concat(minifiedVersion))
  .pipe(addStream.obj(prepareTemplates()))
    .pipe($.concat(minifiedVersion))
  .pipe(gulp.dest('dist/'));
});

gulp.task('less', function () {
    return gulp.src('src/less/digit-field.less')
        .pipe($.less({compress: true}))
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('clean', function(){
  return gulp.src('dist', {read: false})
        .pipe($.clean());
});

gulp.task('dist', ['js','less']);

gulp.task('default', function(){
  runSequence('clean', ['dist']);
});
