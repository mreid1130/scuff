# Scuff

[![NPM version](http://img.shields.io/npm/v/scuff.svg)](https://www.npmjs.org/package/scuff)

One stop shop for web scraping with node. A lightweight wrapper for phantom, request, and cheerio.

## Functions
### static(url, callback, options)

Uses request to get an HTML body of static webpage. Returns a function, `$`, that has jQuery like functionality in node.

__Arguments__

* `url` - URL of the page you'd like to scrape.
* `callback` - Function with arguments `error` and a cheerio function (jQuery implementation in node) to easily navigate through the HTML or XML structure.
* `options` - `options.retries` allows you to set the number of attempts to get the requested data's HTML content. Utilizes exponential backoff to reduce and eliminate the number of network errors. Options.retries accepts a `number` between 1 and 5. `options.xml` accepts a truthy or falsey value indicating an XML feed.

### dynamic(url, callback, options)

Uses phantom to get HTML body of a dynamic site (includes dynamic content rendered by JavaScript). Returns a function, `$`, that has jQuery like functionality in node.

__Arguments__

* `url` - URL of the page you'd like to scrape.
* `callback` - Function with arguments `error` and a cheerio function (jQuery implementation in node) to easily navigate through the HTML or XML structure. Includes dynamic content rendered by JavaScript.
* `options` - `options.retries` allows you to set the number of attempts to get the requested data's HTML content. Utilizes exponential backoff to reduce and eliminate the number of network errors. Options.retries accepts a `number` between 1 and 5.