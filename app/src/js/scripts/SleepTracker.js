window._ = require('lodash');
require('./lodash.math.js');
var $ = require('jquery');
var jqueryflot = require('./jquery.flot');
var jqueryflottime = require('./jquery.flot.time');
var curvedLines = require('./curvedLines');

var number_of_points = 10;

module.exports = class SleepTracker {
	constructor(interval, selector, sleepSampleSize, timeToSleep, sleepThreshold) {
		var now = Date.now();
		this.data = _.range(number_of_points).map(number => [now - number * 1000, 0]).reverse();
		this.previous = 0;
		this.rawdata = [];
		this.selector = selector;
		this.interval = interval;
		this.sleepSampleSize = sleepSampleSize;
		this.sleepThreshold = sleepThreshold;
		this.timeToSleep = timeToSleep;
		this.lastAwake = Date.now();
		this.awake = true;
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
				min: -0.1,
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
		if (data.length > number_of_points) {
			data.shift();
		}

		data.push([Date.now(), datum || 0]);

		this.sampleData();

	}
	sampleData() {
		var now = Date.now();
		var sampleData = this.data
		.filter(item => now - item[0] < this.sleepSampleSize)
		.map(item => item[1]);
		var mean = _.mean(sampleData).toFixed(4);
		
		if (mean > this.sleepThreshold) {
			this.lastAwake = now;
			this.awake = true;
		} else if (now - this.lastAwake > this.timeToSleep) {
			this.awake = false;
		}
		$('#debug').text(this.awake ? 'AWAKE' : 'SLEEPING')
	}
	deviceMotionHandler(eventData) {
		var acceleration = eventData.acceleration;
		var data = Math.abs(acceleration.x) + Math.abs(acceleration.y) - this.previous;
		this.previous = data;
		this.rawdata.push(data);
	}
	sampleRawData() {
		var rawdata = this.rawdata
		var result = Math.min(
			(_.max(rawdata) + _.min(rawdata))/2, 
		0.15);
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