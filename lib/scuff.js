'use strict';

var Static = require('./static');
var Dynamic = require('./dynamic');

/**
 * Retuns a Promise of a new Scuff class
 * @param url - url string to scrape
 * @param [config] configuration object
 * @param [config.dynamic] - bool: use phantom?
 * @returns {Promise}
 */

module.exports = (url, config = {}) => {
  return config.dynamic ? Dynamic(url) : Static(url);
};