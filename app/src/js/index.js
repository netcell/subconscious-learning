var $ = require('jquery');

var scripts = rfolder('./scripts');

$(function() {
	var script = scripts[$('#script-run').attr('data')];
	script && script();	
})

