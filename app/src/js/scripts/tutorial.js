window.$ = window.jQuery = require('jquery');
require('jquery-ui');
require('./jquery.transform');
var owlcarouselmin = require('./owl.carousel.min');
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
	$('.owl-carousel').owlCarousel({
		items : 1,
		dots : true,
		autoplay: true,
		dotsEach: true
	});
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