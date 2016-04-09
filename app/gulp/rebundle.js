var gulp        = require('gulp');
var browserSync = require('browser-sync');
var duration    = require('gulp-duration');
var notifier    = require('node-notifier');
var notify      = require('gulp-notify');
var uglify      = require('gulp-uglify');
var config      = require('./config');
var source      = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

module.exports = function rebundle(bundler, dest) {
	return bundler.bundle()
	.on('error', function(err) {
		var message = err.toString();
		notifier.notify({
			title   : 'BUILD FAILED',
			message : message
		});
		console.error(message);
	})
	.pipe(duration('rebundle'))
	.pipe(source('index.js'))
	.pipe(gulp.dest(dest))
	.pipe(notify({
		title   : 'BUILD SUCCESS',
		message : 'Javascript Rebundled.',
	})).pipe(browserSync.reload({stream:true}));
}