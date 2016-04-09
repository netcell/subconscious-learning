require("babel-register");
var gulp        = require('gulp');
var runSequence = require('run-sequence');
var notifier    = require('node-notifier');

require('./gulp/browserify');
require('./gulp/clean');
require('./gulp/copy');
require('./gulp/server');

gulp.task('default', function(callback){
	runSequence(
		['clean'],
		['copy:serve', 'browserify'],
		['copy:watch', 'server'],
	function(){
		notifier.notify({
			title: 'BUILD SUCCESS',
			message: '',
			sound: true
		});
		callback();
	})
})