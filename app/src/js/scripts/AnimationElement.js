var $ = require('jquery');
var _ = require('lodash');

module.exports = class AnimationElement {
	constructor(selector, endVars, duration, ease) {
		this.el = $(selector);
		this.endVars = endVars;
		this.startVars = this.el.map((index, el) => {
			el = $(el);
			var startVar = {};
			_.forEach(endVars, (value, key) => {
				startVar[key] = el.css(key);
			});
			return { el, startVar };
		}).toArray();
		this.duration = duration;
		this.ease = ease;
	}
	show() {
		var {endVars, duration, ease, el} = this;
		return el.animate(endVars, duration, ease)
			.promise();
	}
	hide() {
		var {startVars, duration, ease, el} = this;
		return $.when.apply($, 
			startVars
			.map( ({ el, startVar }) => el
				.animate(startVar, duration, ease)
				.promise()
			)
		)
	}
}