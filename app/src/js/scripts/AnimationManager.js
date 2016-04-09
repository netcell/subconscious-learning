var $ = require('jquery');
var AnimationElement = require('./AnimationElement');
module.exports = class AnimationManager {
	constructor(steps) {
		this.steps = steps;
	}
	invert() {
		var show = this.show;
		this.show = this.hide;
		this.hide = this.show;
	}
	animate(type) {
		var promises = null;
		this.steps
		.forEach(step => {
			if (promises) promises = promises
				.then(function() {
					return $.when.apply($, 
						step.map(anims => anims[type]())
					);
				})
			else promises = $.when.apply($, 
				step.map(anims => anims[type]())
			);
		})
		return promises;
	}
	show() {
		return this.animate('show');
	}
	hide() {
		return this.animate('hide');
	}
}