var gulp   = require('gulp');
var clean  = require('gulp-clean');
var folder = require('./config').folder;

gulp.task('clean', function () {
	return gulp.src([ folder.serve ], {read: false}).pipe(clean({force: true}));
});