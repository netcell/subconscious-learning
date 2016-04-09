var gulp       = require('gulp');
var browserify = require('browserify');
var watchify   = require('watchify');
var babelify   = require('babelify');
var rebundle   = require('./rebundle');
var folder     = require('./config').folder;
/**
 * Bundle the javascript files
 * @param  {String} dest - destination for the output file
 */
function bundle(dest) {
	/** source maps setting */
	// watchify.args.debug = true;
	/** Browserify bundler */
	var bundler = browserify(folder.src + '/js/index.js', watchify.args);
	/** Watchify bundler if needed */
	bundler = watchify(bundler);
	/** Browserify transforms */
	bundler.transform("babelify", {presets: ["es2015"]});
	bundler.transform("rfolderify");
	bundler.transform("uglifyify");
	/** ! Browserify transforms */
	/** Rebundle on update if watchify is used */
	bundler.on('update', function(){
		rebundle(bundler, dest);
	});
	/** Bundle */
	return rebundle(bundler, dest);
}
gulp.task('browserify', function() {
	return bundle(folder.serve + '/js');
});