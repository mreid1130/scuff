var phantom = require('phantom');
var request = require('request');

module.exports.static = function(url, next, options) {
  if (options.retries) {
    if (typeof options.retries !== 'number') {
      return next(new Error('options.retries must be a number'));
    }
    options.retries = Math.floor(options.retries);
    if (options.retries > 5) {
      options.retries = 5;
    }
    if (options.attempts) {
      options.attempts++;
    } else {
      options.attempts = 1;
    }
    request(url, function(err, res, body) {
      if (err && (err.message === 'ENOTFOUND' || err.message === 'ESOCKETTIMEDOUT' || err.message === 'ETIMEDOUT' || err.code === 'ENOTFOUND' || err.message === 'socket hang up' || err.code === 'ECONNRESET')) {
        if (options.attempts === options.retries) {
          return next(new Error('Failed to get response on ' + options.retries + ' attempts'));
        } else {
          setTimeout(function() {
            module.exports.static(url, next, options);
          }, Math.pow(2, options.attempts) * 500);
        }
      } else {
        next(err, body.trim());
      }
    });
  } else {
    request(url, function(err, res, body) {
      if (err) {
        return next(err);
      }
      next(err, body.trim());
    });
  }
};

module.exports.dynamic = function(url, next, options) {
  if (options.retries) {
    if (typeof options.retries !== 'number') {
      return next(new Error('options.retries must be a number'));
    }
    options.retries = Math.floor(options.retries);
    if (options.retries > 5) {
      options.retries = 5;
    }
    if (options.attempts) {
      options.attempts++;
    } else {
      options.attempts = 1;
    }
    phantom.create(function(ph) {
      ph.createPage(function(page) {
        page.open(url, function(status) {
          if (status === 'success') {
            page.get('content', function(content) {
              ph.exit();
              next(null, content.trim());
            });
          } else {
            ph.exit();
            if (options.attempts === options.retries) {
              return next(new Error('Failed to get response on ' + options.retries + ' attempts'));
            } else {
              setTimeout(function() {
                module.exports.dynamic(url, next, options);
              }, Math.pow(2, options.attempts) * 500);
            }
          }
        });
      });
    });
  } else {
    phantom.create(function(ph) {
      ph.createPage(function(page) {
        page.open(url, function(status) {
          if (status === 'success') {
            page.get('content', function(content) {
              ph.exit();
              next(null, content.trim());
            });
          } else {
            ph.exit();
            next(new Error('error with Phantom opening url'));
          }
        });
      });
    });
  }
};

// require('./index.js').static('http://www.milb.com/schedule/results.jsp?sid=t402&year=2016', function(err, body) { if(err) {console.log(err.stack)}console.log(body);}, {retries: 7});