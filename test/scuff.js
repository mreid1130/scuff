var expect = require('expect.js');
var cheerio = require('cheerio');
var scuff = require('../index');

describe('scuff', () => {

	it ('should get the version', () => {
		expect(/\d+\.\d+\.\d+/.test(scuff.version)).to.be.ok();
	});

	it ('should scrape a static page with request', (done) => {
		scuff('https://google.com')
			.then((html) => {
				var $ = cheerio.load(html);
				var titleTag = $('title').text();
				expect(titleTag).to.be('Google');
				done();
			})
			.catch(done)
	});

	it ('should scrape a static page with phantom', (done) => {
		this.timeout(10000);
		scuff('https://google.com', {
			dynamic: true,
			timeout: 1000
		})
			.then((html) => {
				var $ = cheerio.load(html);
				var titleTag = $('title').text();
				expect(titleTag).to.be('Google');
				done();
			})
			.catch(done)
	});
});