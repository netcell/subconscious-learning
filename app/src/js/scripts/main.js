var $ = require('jquery');
require('jquery-ui');
require('./jquery.transform');
var AnimMan = require('./AnimationManager');
var AnimEl = require('./AnimationElement');
var SleepTracker = require('./SleepTracker');
module.exports = function() {
	var tracker = new SleepTracker(1000, '#chart-placeholder');
	var animation = new AnimMan([
		[
			new AnimEl('body', {
				'opacity' : 1
			})
		]
	]);
	animation.show().then(function() {

		if (window.DeviceMotionEvent) {
			window.addEventListener(
				'devicemotion',
				(eventData) => tracker.deviceMotionHandler(eventData),
				false
			);
		} else {
			
		}

		$('#dreamoff').one('click', function() {
			animation.hide().then(function() {
				window.location = "/level1.html";
			})
		});
	})
}