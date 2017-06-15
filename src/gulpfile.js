//------------------------//
//Libraries
//------------------------//
var	gulp = require('gulp');								// Подключаем gulp
var	sass = require('gulp-sass'); 						// Подключаем конвертер SASS/SCSS в CSS
var	uglify = require('gulp-uglify'); 					// Подключаем минификаци JavaScript
var	autoprefixer = require('gulp-autoprefixer'); 		// Подключаем автопрефиксер для css
var	browserSync = require('browser-sync'); 				// Подключаем авто-синхронизацию браузеров
var imagemin = require('gulp-imagemin'); 				// Подключаем библиотеку для работы с изображениями
var pngquant = require('imagemin-pngquant'); 			// Подключаем библиотеку для работы с png
var rigger = require('gulp-rigger');					// Подключаем конструктор для работы с html
var watch = require('gulp-watch');						// Подключаем наблюдателя
//------------------------//
//Global path
//------------------------//
var path = {
    build: {
        html:   	'build/',							//used
        js:     	'build/js/',						//used
        css:    	'build/css/',						//used
        img:    	'build/img/'						//used
    },
    src: {
        template:   'dev/pages/*.html',					//used
        html:   	'dev/',								//used
        js:     	'dev/js/**/*.js',					//used
        css:    	'dev/css/',							//used
        scss:   	'dev/scss/*.scss',					//used
		img:		'dev/img/**/*.+(png|jpg|gif|svg)'	//used
    },
    watch: {
        html:   	'dev/*.html',						//used
        part:   	'dev/part/*.html',					//used
		pages:		'dev/pages/*.html',					//used
        js:     	'dev/js/**/*.js',					//used
        scss:   	'dev/scss/**/*.scss'				//used
    },
};
//------------------------//
//WELCOME Dmitry!
//------------------------//
//------------------------//
//DEVELOP
//------------------------//
//Авто-запуск sass,autoprefixer и uglify при изменение файлов
gulp.task('default',['browserSync', 'sass'], function(){
	gulp.watch(path.watch.scss, ['sass']);	
	gulp.watch(path.watch.part, ['html']);
	gulp.watch(path.watch.pages, ['html']);
	gulp.watch(path.watch.js, browserSync.reload);
	console.log('Hello Dmitry! Development server is working! Enjoy it ^_^');
});
//(1_SCSS->CSS)			gulp-SASS
gulp.task('sass', function(){
  return gulp.src(path.src.scss) 
    .pipe(sass())
	.pipe(autoprefixer())
    .pipe(gulp.dest(path.src.css))
    .pipe(browserSync.reload({stream: true}));
});
//(2_RIGGER->html)		gulp-rigger
gulp.task('html', function () {
    return gulp.src(path.src.template)
        .pipe(rigger())
        .pipe(gulp.dest(path.src.html))
        .pipe(browserSync.reload({stream: true}));
});
//Browser Auto-Synchronization
gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: 'dev'
		},
	})
})
//------------------------//
//BUILD
//------------------------//
//(1_JS->minJS)			gulp-uglify
gulp.task('minJS', function () {
	gulp.src(path.src.js)
		.pipe(uglify())
		.pipe(gulp.dest(path.build.js))
});
//(2_IMG)				gulp-imagemin
gulp.task('img', function(){
	return gulp.src(path.src.img)
		.pipe(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest(path.build.img))
});
gulp.task('build', ['img', 'minJS'], function() {

    var buildCss = gulp.src([ 							// Переносим библиотеки в продакшен
        'dev/css/*.css'
        ])
    .pipe(gulp.dest(path.build.css))

    var buildJs = gulp.src('dev/js/**/*') 				// Переносим скрипты в продакшен
    .pipe(gulp.dest(path.build.js))

    var buildHtml = gulp.src('dev/*.html') 				// Переносим HTML в продакшен
    .pipe(gulp.dest(path.buld.html));
});