var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({pattern: ['gulp-*']}),
    packagejson = require('./package.json'),
    runSequence = require('run-sequence'),
    addStream = require('add-stream'),
    angularTemplateCache = require('gulp-angular-templatecache'),
    karma = require('gulp-karma'),
    Server = require('karma').Server,
    angularProtractor = require('gulp-angular-protractor');

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

gulp.task('test', function(done){
    new Server({
      configFile: __dirname + '/karma.conf.js',
      singleRun: true
    }, done).start();
});

var e2eTest = function(param){
  gulp.task('e2e:'+param, function(){
    gulp.src(['./tests/e2e/*.js'])
      .pipe(angularProtractor({
          'configFile': param === "travis" ? 'protractor.travis.conf.js' : 'protractor.conf.js',
          'args': ['--baseUrl', 'http://127.0.0.1:8000'],
          'autoStartStopServer': true,
          'debug': false
      }))
      .on('error', function(e) { throw e; });
  });
};

e2eTest("local");
e2eTest("travis");

gulp.task('dist', function(){
  runSequence(['js','less'], 'test');
});

gulp.task('travis', function(){
  runSequence('dist', 'e2e:travis');
});

gulp.task('default', function(){
  runSequence('clean', ['dist'], "e2e:local");
});
