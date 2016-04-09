var $ = require('jquery');
require('jquery-ui');
require('./jquery.transform');
var AnimMan = require('./AnimationManager');
var AnimEl = require('./AnimationElement');

module.exports = function() {
	var animation = new AnimMan([
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
	]);
	var animation2 = new AnimMan([
		[
			new AnimEl('body>div', {
				'opacity' : 0
			})
		]
	]);
	animation.show().then(function() {
		$('.level1-back').one('click', function() {
			animation.hide().then(function() {
				window.location = "index.html";
			})
		});
		$('.upper').one('click', function() {
			animation2.show().then(function() {
				window.location = "tutorial.html";
			})
		});
	})
}