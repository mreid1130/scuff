# Scuff

[![NPM version](http://img.shields.io/npm/v/scuff.svg)](https://www.npmjs.org/package/scuff)

[![NPM](https://nodei.co/npm/scuff.png?downloads=true)](https://nodei.co/npm/scuff/)

One stop shop for web scraping with node. A lightweight wrapper for phantom, request, and cheerio.

## Functions
### static(url, callback, options)

Uses request to get an HTML body of static webpage. Returns a cheerio function, `$`, that has jQuery like functionality in node ([see cheerio's documentation](https://www.npmjs.com/package/cheerio "cheerio documentation")).

__Arguments__

* `url` - URL of the page you'd like to scrape.
* `callback` - Function with arguments `error` and a cheerio function ([jQuery implementation in node](https://www.npmjs.com/package/cheerio)) to easily navigate through the HTML or XML structure.
* `options` - `options.retries` allows you to set the number of attempts to get the requested data's HTML content. Utilizes exponential backoff to reduce and eliminate the number of network errors. Options.retries accepts a `number` between 1 and 5. Also accepts an object `options.cheerio` which will take any options accepted by [htmlparser2](https://github.com/fb55/htmlparser2/wiki/Parser-options "htmlparser2 options")

### dynamic(url, callback, options)

Uses phantom to get HTML body of a dynamic site (includes dynamic content rendered by JavaScript). Returns a cheerio function, `$`, that has jQuery like functionality in node ([see cheerio's documentation](https://www.npmjs.com/package/cheerio "cheerio documentation")).

__Arguments__

* `url` - URL of the page you'd like to scrape.
* `callback` - Function with arguments `error` and a cheerio function ([jQuery implementation in node](https://www.npmjs.com/package/cheerio)) to easily navigate through the HTML or XML structure. Includes dynamic content rendered by JavaScript.
* `options` - `options.retries` allows you to set the number of attempts to get the requested data's HTML content. Utilizes exponential backoff to reduce and eliminate the number of network errors. Options.retries accepts a `number` between 1 and 5.