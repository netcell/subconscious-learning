var gulp        = require('gulp');
var folder      = require('./config').folder;
var browserSync = require('browser-sync');

gulp.task('server', function() {
	browserSync({
		server    : {
			baseDir   : folder.serve,
			directory : true
		},
		open      : true
    });
});