# Scuff

[![NPM version](http://img.shields.io/npm/v/scuff.svg)](https://www.npmjs.org/package/scuff)

A lightweight wrapper for phantom and request.

## Functions
### static(url, callback, options)

Uses request to get HTML body of static webpages.

__Arguments__

* `url` - URL of the page you'd like to scrape.
* `callback` - Function with arguments `error` and the HTML `body` (string) of the page requested.
* `options` - `options.retries` allows you to set the number of attempts to get the requested data's HTML content. Utilizes exponential backoff to reduce and eliminate the number of network errors. Options.retries accepts a `number` between 1 and 5.

### dynamic(url, callback, options)

Uses phantom to get HTML body of a dynamic site (includes dynamic content rendered by JavaScript)

__Arguments__

* `url` - URL of the page you'd like to scrape.
* `callback` - Function with arguments `error` and the HTML `body` (string) of the page requested that includes dynamic content rendered by JavaScript.
* `options` - `options.retries` allows you to set the number of attempts to get the requested data's HTML content. Utilizes exponential backoff to reduce and eliminate the number of network errors. Options.retries accepts a `number` between 1 and 5.