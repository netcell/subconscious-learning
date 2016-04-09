window.$ = window.jQuery = require('jquery');

var AnimMan = require('./AnimationManager');
var AnimEl = require('./AnimationElement');

module.exports = function() {
	var animation = new AnimMan([
		[
			new AnimEl('.animation-show', {
				opacity : 1
			}),
			new AnimEl('#quote', {
				'margin-top' : 60,
				'margin-bottom' : 20,
				'height': 33
			}),
			new AnimEl('#quote img', {
				'height' : 31
			})
		]
	]);
	animation.show().then(function() {
		$('#level1').one('click', function() {
			animation.hide().then(function() {
				window.location = "level1.html";
			})
		});
	})
}