var $ = require('jquery');
require('jquery-ui');
require('./jquery.transform');
var AnimMan = require('./AnimationManager');
var AnimEl = require('./AnimationElement');

module.exports = function() {
	var animation = new AnimMan();
	animation.steps = [
		[
			new AnimEl('.button-group .seperator', {
				opacity : 1,
				width : 300
			}, 800, 'easeInOutQuad')
		], [
			new AnimEl('.animation-show', {
				opacity : 1
			}, 800),
			new AnimEl('.button-group .button-wrapper', {
				'transform' : 'translateY(0px)',
				'-webkit-transform' : 'translateY(0px)'
			}, 500)
		]
	];
	animation.show().then(function() {
		$('.level1-back').one('click', function() {
			animation.hide().then(function() {
				window.location = "/index.html";
			})
		});
	})
}