var Request = require('./request');
var Scuff = require('./scuff');

module.exports = (url, options) => {
  return new Promise((resolve, reject) => {
    Request(url, options).then((content, type = 'html') => {
      var scuff = new Scuff(content, type);
      resolve(scuff);
    }).catch(reject);
  });
};
