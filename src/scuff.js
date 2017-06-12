var Parser = require('./parser');

class Scuff {
  constructor(content, type) {
    this.content = content;
    this.type = type;
  };

  find(selector) {
    Parser(this.content, selector, this.type);
  };

  get raw() {
    return this.content;
  }
};

module.exports = Scuff;

// JSON test page: var scuff = require('./index.js'); scuff('http://data.nba.com/data/15m/json/cms/2016/team/warriors/schedule.json').then(function(html){html.find('efmkwngvrg'); console.log('raw',html.raw)})
// HTML test page: var scuff = require('./index.js'); scuff('https://www.markreid.co/').then(function(scf){scf.find('#header')})
// XML test page: var scuff = require('./index.js'); scuff('http://www.optasports.com/media/577563/srml-8-2013-results-mid-season-.xml').then(function(html){html.find('efmkwngvrg'); console.log('raw',html.raw)})
