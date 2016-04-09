var $ = require('jquery');
require('./jquery.transform');

module.exports = function() {
	console.log($('.button-group .button-wrapper'));
	console.log($('.level-text'));
	$('.button-group .seperator')
	.animate({
		'width' : 300
	}, 300).promise()
	.then(function(){
		return $.when(
			$('.button-group .button-wrapper')
			.animate({
				'transform' : 'translateY(0px)',
				'-webkit-transform' : 'translateY(0px)'
			}, 500).promise(),
			$('.level-text').show().promise()
		);
	})
}