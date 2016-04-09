var $ = require('jquery');
var jqueryflot = require('./jquery.flot');
var jqueryflottime = require('./jquery.flot.time');
var curvedLines = require('./curvedLines');

module.exports = class SleepTracker {
	constructor(interval, selector) {
		var now = Date.now();
		this.data = _.range(30).map(number => [now - number * 1000, 0]).reverse();
		// var now = Date.now();
		// for (var i = 0; i < 60; i--) {
		// 	now = now - i * 500;
		// 	this.data[0].push([now , 0]);
		// }
		this.previous = 0;
		this.rawdata = [];
		this.selector = selector;
		this.interval = interval;
		this.initGraph();
		this.update();
	}
	initGraph(minTickSize) {
		this.plot = $.plot(this.selector, [{
			data : this.data,
			color: '#3A79C2',
			lines: {show: true, lineWidth: 3},
			curvedLines : {apply : true, tension: 1}
		}], {
			grid: {
				show: false
			},
			series: {
				shadowSize: 0,
				curvedLines : {active : true}
			},
			yaxis: {
				show: false,
				min: 0,
				max: 0.2
			},
			xaxis: {
				show: false,
				// minTickSize: 5000,
				mode: "time",
				tickSize: [10, "second"]
			}
		});
	}
	updateData(datum) {
		var data = this.data;
		if (data.length > 30) {
			data.shift();
		}
		data.push([Date.now(), datum]);
	}
	deviceMotionHandler(eventData) {
		var acceleration = eventData.acceleration;
		var data = Math.abs(acceleration.x) + Math.abs(acceleration.y) - this.previous;
		this.previous = data;
		this.rawdata.push(data);
	}
	sampleRawData() {
		$('#debug').text(_.mean(this.rawdata));
		var result = Math.min(_.mean(this.rawdata), 0.15);
		this.rawdata = [];
		this.previous = 0;
		return result;
	}
	update() {
		this.updateData(this.sampleRawData());
		this.initGraph();
		if (!this.cancel)
			this.timeout = setTimeout(() => {
				this.update()
			}, this.interval);
	}
	pause() {
		this.cancel = true;
	}
	resume() {
		this.firstTime = 0;
		this.cancel = false;
		this.update();
	}
}