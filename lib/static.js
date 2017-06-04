'use strict';

var request = require('request');

module.exports = (url, config) => {
	return new Promise((resolve, reject) => {
		request(url, function (err, res, body) {
			err ? reject(err) : resolve(body);
		});
	});
};