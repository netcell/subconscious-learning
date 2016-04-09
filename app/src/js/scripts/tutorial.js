var $ = require('jquery');
require('jquery-ui');
require('./jquery.transform');
var AnimMan = require('./AnimationManager');
var AnimEl = require('./AnimationElement');

module.exports = function() {
	var animation = new AnimMan([
		[
			new AnimEl('body', {
				'opacity' : 1
			})
		]
	]);
	animation.show().then(function() {
		$('.tutorial-back').one('click', function() {
			animation.hide().then(function() {
				window.location = "level1.html";
			})
		});
		$('#dreamon').one('click', function() {
			animation.hide().then(function() {
				window.location = "main.html";
			})
		});
	})
}