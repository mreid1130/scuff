// @flow

var request =require('request');

module.exports = (url: string, config?: Config) => {
	return new Promise((resolve, reject) => {
		request(url, function(err, res, body) {
			err ? reject(err) : resolve(body);
		});
	});
};