var $ = require('jquery');

module.exports = {
	show() {
		return $('.animation-show').fadeIn().promise()
	},
	hide() {
		return $('.animation-show').fadeOut().promise()
	}
}