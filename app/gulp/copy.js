var gulp     = require('gulp');
var watch    = require('gulp-watch');
var folder   = require('./config').folder;
var plumber  = require('gulp-plumber');

function copyServe(doWatch){
	var srcAsset  = [
		folder.src + '/css/**/*.*',
		folder.src + '/fonts/**/*.*',
		folder.src + '/assets/**/*.*',
		folder.src + '/*.html'
	];
	var stream = gulp.src(srcAsset, { base: folder.src});
	if (doWatch) stream = stream.pipe(
		watch(srcAsset, {
			base          : folder.src,
			ignoreInitial : true,
			interval      : 1000
		})).pipe(plumber()
	);
	return stream.pipe(gulp.dest(folder.serve));
}

gulp.task('copy:serve', function(callback){
	return copyServe(false);
});

gulp.task('copy:watch', function(callback){
	return copyServe(true)
});