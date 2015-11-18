# Scuff

[![NPM version](http://img.shields.io/npm/v/scuff.svg)](https://www.npmjs.org/package/scuff)

A lightweight wrapper for phantom and request.

## Functions
### static(url, callback, options)

Uses request to get HTML body of static webpages.

### dynamic(url, callback, options)

Uses phantom to get HTML body of a dynamic site (includes dynamic content rendered by JavaScript)