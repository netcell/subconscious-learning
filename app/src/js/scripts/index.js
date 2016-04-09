var $ = require('jquery');

module.exports = function() {
	$('#level1').click(() => {
		$.when(
			$('.tobehidden')
				.fadeOut()
				.promise(),
			$('#quote')
				.animate({
					'margin-top' : 0,
					'margin-bottom' : 0,
					'height': 0
				}).promise(),
			$('#quote img')
				.animate({
					'height' : 0
				}).promise()
		).then(() => {
			window.location = '/level1.html';
		});
	})
}