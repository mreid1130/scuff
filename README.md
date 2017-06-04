# Scuff

[![NPM version](http://img.shields.io/npm/v/scuff.svg)](https://www.npmjs.org/package/scuff)

[![NPM](https://nodei.co/npm/scuff.png?downloads=true)](https://nodei.co/npm/scuff/)

One stop shop for web scraping with node. A lightweight wrapper for phantom, request, and cheerio.

## Usage

```
var scuff = require('scuff');

// scrape a static page
scuff('https://google.com')
	.then(html => {
		// use HTML string
	});

// scrape page and execute JS to retrieve dynamic content
scuff('https://google.com', {
		dynamic: true, // flags program to use phantom to retrieve dynamic content
		timeout: 10000 // (optional) - wait 10 seconds to allow JS to execute on page
	})
	.then(html => {
		// use HTML string
	});

```

__Arguments__

* `url` - URL of the page you'd like to scrape.
* `options` - object to pass additional details 
* `options.dynamic` - Boolean - whether to use phantom for dynamic content (`true`) or request for static content (`false`)
* `options.timeout` - Number - time (in MS) which phantom should wait to allow JS to execute
* `options.retries` - Number - allows you to set the number of attempts to get the requested data's HTML content. Utilizes exponential backoff to reduce and eliminate the number of network errors.
