var expect = require('expect.js');
var cheerio = require('cheerio');
var scuff = require('../index');

describe('scuff', function() {

	it ('should get the version', function() {
		expect(/\d+\.\d+\.\d+/.test(scuff.version)).to.be.ok();
	});

	it ('should scrape a static page with request', function(done) {
		scuff('https://google.com')
			.then((html) => {
				var $ = cheerio.load(html);
				var titleTag = $('title').text();
				expect(titleTag).to.be('Google');
				done();
			})
			.catch(done)
	});

	it ('should scrape a static page with phantom', function(done) {
		this.timeout(10000);
		scuff('https://google.com', {
			dynamic: true
		})
			.then((html) => {
				var $ = cheerio.load(html);
				var titleTag = $('title').text();
				expect(titleTag).to.be('Google');
				done();
			})
			.catch(done)
	});

	it ('should fail to scrape dynamic content with request', function(done) {

	});

	it ('should scrape dynamic content with phantom', function(done) {

	});
});