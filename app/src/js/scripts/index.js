var $ = require('jquery');

var AnimMan = require('./AnimationManager');
var AnimEl = require('./AnimationElement');

module.exports = function() {
	var animation = new AnimMan(true);
	animation.steps = [
		[
			new AnimEl('.animation-show', {
				opacity : 0
			}),
			new AnimEl('#quote', {
				'margin-top' : 0,
				'margin-bottom' : 0,
				'height': 0
			}),
			new AnimEl('#quote img', {
				'height' : 0
			})
		]
	];
	animation.show().then(function() {
		$('.level1-back').one('click', function() {
			$('#level1').click(() => {
				animation.hide().then(function() {
					window.location = "/level1.html";
				})
			})
		});
	})
}