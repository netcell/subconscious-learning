var $ = require('jquery');
require('jquery-ui');
require('./jquery.transform');
var AnimMan = require('./AnimationManager');
var AnimEl = require('./AnimationElement');
var SleepTracker = require('./SleepTracker');
var Somia = require('./Somia');

module.exports = function() {
	document.addEventListener("deviceready", onDeviceReady, false);
	function onDeviceReady() {
	    var tracker = new SleepTracker(1000, '#chart-placeholder', 30000, 60 * 1000, 0.05);
		var somia = new Somia(tracker);
		var animation = new AnimMan([
			[
				new AnimEl('body', {
					'opacity' : 1
				})
			]
		]);
		animation.show().then(function() {

			somia.start();

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
					window.location = "level1.html";
				})
			});
		})
	}	
}