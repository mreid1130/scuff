var phantom = require('phantom');
var needle = require('needle');
var URL = require('url');

var staticRequest = (url, config = {}) => {
  return new Promise((resolve, reject) => {
    needle.get(url, (err, res) => {
      if (err !== null) {
        return reject(err.message);
      }

      if (res && res.statusCode >= 400 && res.statusCode <= 500) {
        return reject(res.statusCode + ' ' + res.statusMessage);
      }

      return resolve(res.body);
    });
  });
};

var dynamicRequest = (url, config = {}) => {
  return new Promise((resolve, reject) => {
    var ph;
    var page;
    phantom.create(['--ignore-ssl-errors=yes', '--load-images=no', '--web-security=false'])
      .then(instance => {
        ph = instance;
        return ph.createPage();
      })
      .then(doc => {
        page = doc;
        return doc.open(url);
      })
      .then(status => {
        if (status !== 'success') return reject(new Error('failure status opening url'))
        var timeout = (config.timeout ? config.timeout : 0);
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(page.property('content'));
          }, timeout);
        });
      })
      .then(html => {
        ph.exit();
        resolve(html);
      })
      .catch(err => {
        if (ph) {
          ph.exit();
        }
        reject(err);
      });
  });
};

var Request = (url, timeout) => {
  var config = {};
  config.timeout = timeout || 0;
  var request = timeout ? DynamicRequest : StaticRequest;

  if (url.substr(0, 1) === '//') {
    url = URL.parse('http:' + url, true);
  } else if (url.substr(0, 4) !== 'http') {
    url = URL.parse('http://' + url, true);
  } else {
    url = URL.parse(url, true);
  }

  return request(url, config);
};

module.exports = Request;
