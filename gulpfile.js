var gulp = require('gulp');
var del = require('del');
var path = require('path');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watch = require('gulp-watch');
var cache = require('gulp-cache');

var report_error = function(error) {
    $.notify({
        title: 'An error occured with a Gulp task',
        message: 'Check you terminal for more informations'
    }).write(error);

    console.log(error.toString());
    this.emit('end');
};

gulp.task('styles', function () {
    return gulp.src('src/scss/main.scss')
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            precision: 6, outputStyle: 'compressed', sourceComments: false, indentWidth: 4,
        }))
        .on('error', report_error)
        .pipe($.autoprefixer({
            browsers: [
            'ie >= 10',
            'ie_mob >= 10',
            'ff >= 30',
            'chrome >= 34',
            'safari >= 7',
            'opera >= 23',
            'ios >= 7',
            'android >= 4.4',
            'bb >= 10'
            ]
        }))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('dest/css'))
        .pipe($.size({title: 'styles'}));
});

gulp.task('bower', function() {
    return gulp.src('src/js/libs/**/*')
        .pipe(gulp.dest('dest/js/libs'))
        .pipe($.size({ title: 'bower' }));
});

gulp.task('fonts', function() {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dest/fonts'))
        .pipe($.size({ title: 'fonts' }));
});

gulp.task('img', function() {
    return gulp.src(['src/img/**/*.jpg', 'src/img/**/*.png', 'src/img/**/*.gif'])
        .pipe(cache($.imagemin()))
        .pipe(gulp.dest('dest/img'))
        .pipe($.size({ title: 'img' }));
});

gulp.task('layoutImg', function() {
    return gulp.src(['src/layoutImg/**/*.jpg', 'src/layoutImg/**/*.png', 'src/layoutImg/**/*.gif'])
        .pipe(cache($.imagemin()))
        .pipe(gulp.dest('dest/layoutImg'))
        .pipe($.size({ title: 'layoutImg' }));
});

gulp.task('img-svg', function() {
    return gulp.src('src/img/**/*.svg')
        .pipe(gulp.dest('dest/img'))
        .pipe($.size({ title: 'img-svg' }));
});

gulp.task('layoutImg-svg', function() {
    return gulp.src('src/layoutImg/**/*.svg')
        .pipe(gulp.dest('dest/layoutImg'))
        .pipe($.size({ title: 'layoutImg-svg' }));
});

gulp.task('js', function () {
    return browserify('src/js/main.js', {debug: true}).bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe($.sourcemaps.init({loadMaps: true}))
        .pipe($.uglify())
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('dest/js'));

});

gulp.task('templates', function() {
   return gulp.src('src/templates/*.html.twig')
        .pipe($.twig())
        .pipe($.extReplace('.html', '.html.html'))
        //.pipe($.prettify({ indent_size: 4 }))
        .pipe($.htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dest'))
        .pipe($.size({title: 'template'}));
});
gulp.task('templates-en', function() {
   return gulp.src('src/templates/en/*.html.twig')
        .pipe($.twig())
        .pipe($.extReplace('.html', '.html.html'))
        //.pipe($.prettify({ indent_size: 4 }))
        .pipe($.htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dest'))
        .pipe($.size({title: 'template-en'}));
});


gulp.task('watch', function () {
    browserSync({
        notify: false,
        server: ['dest']
    });

    watch('src/scss/**/*', function(){
        gulp.start(['styles'], reload);
    });
    watch('src/templates/**/*', function(){
        gulp.start(['templates'], reload);
        gulp.start(['templates-en'], reload);
    });
    watch('src/fonts/**/*', function(){
        gulp.start(['fonts'], reload);
    });
    watch('src/img/**/*', function(){
        gulp.start(['img'], reload);
        gulp.start(['img-svg'], reload);
    });
    watch('src/layoutImg/**/*', function(){
        gulp.start(['layoutImg'], reload);
        gulp.start(['layoutImg-svg'], reload);
    });
    watch('src/js/**/*', function(){
        gulp.start(['js'], reload);
    });
    watch('src/js/libs/**/*', function(){
        gulp.start(['bower'], reload);
    });

    var fileWatcher = watch('src/**/*').on('unlink', function(currentPath){
        var filePathFromSrc = path.relative(path.resolve('src'), currentPath);
        var destFilePath = path.resolve('dest', filePathFromSrc).replace('templates/', '');
        del.sync(destFilePath);
        console.log('File removed - ' + destFilePath);
    });
});

gulp.task('start', ['styles', 'templates', 'templates-en', 'fonts', 'img', 'layoutImg', 'img-svg', 'layoutImg-svg', 'js', 'bower']);
