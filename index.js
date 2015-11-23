var phantom = require('phantom');
var request = require('request');
var cheerio = require('cheerio');

module.exports.static = function(url, next, options) {
  if (!options) {
    options = {};
  }
  if (!options.retries || options.retries < 1) {
    options.retries = 1;
  }
  if (typeof options.retries !== 'number') {
    return next(new Error('options.retries must be a number'));
  }
  options.retries = Math.floor(options.retries);
  if (options.retries > 5) {
    options.retries = 5;
  }
  if (options.attempts && typeof options.attempts === 'number') {
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
      var $;
      try {
        $ = cheerio.load(body, {
          xmlMode: (options.xml ? true : false)
        });
      } catch (error) {
        return next(error);
      }
      next(err, $);
    }
  });
};

module.exports.dynamic = function(url, next, options) {
  if (!options) {
    options = {};
  }
  if (!options.retries || options.retries < 1) {
    options.retries = 1;
  }
  if (typeof options.retries !== 'number') {
    return next(new Error('options.retries must be a number'));
  }
  options.retries = Math.floor(options.retries);
  if (options.retries > 5) {
    options.retries = 5;
  }
  if (options.attempts && typeof options.attempts === 'number') {
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
            var $;
            try {
              $ = cheerio.load(content, {
                xmlMode: (options.xml ? true : false)
              });
            } catch (error) {
              return next(error);
            }
            next(null, $);
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
};
