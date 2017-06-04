// @flow

var phantom = require('phantom');

module.exports = (url: string) => {
  return new Promise((resolve, reject) => {
  	var ph;
  	var page;
    phantom.create(['--ignore-ssl-errors=yes', '--load-images=no', '--web-security=false'])
      .then(function(instance) {
        ph = instance;
        return ph.createPage();
      })
      .then(function(doc) {
        page = doc;
        return doc.open(url);
      })
      .then(function(status) {
      	if (status !== 'success') return reject(new Error('failure status opening url'))
      	return page.property('content');
      })
      .then(function(html) {
		    ph.exit();
		    resolve(html);
      })
      .catch(function(err) {
		    if (ph) {
		      ph.exit();
		    }
		    reject(err);
      });
  });
};
