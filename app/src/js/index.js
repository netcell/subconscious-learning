window.$ = window.jQuery = require('jquery');

var scripts = rfolder('./scripts');

var script = scripts[$('#script-run').attr('data')];
script && script();

