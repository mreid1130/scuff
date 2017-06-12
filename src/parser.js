var htmlparser = require("htmlparser2");

var xmlParser = (content, selector) => {};

var htmlParser = (content, selector) => {
  var dom = htmlparser.parseDOM(content);
  var rootElem = htmlparser.parseDOM('<root></root>');
  dom = addParent(dom, rootElem);

  if (!selector) return dom;
};

var addParent = (dom, parent) => {
  if (!Array.isArray(dom)) {
    dom = [dom];
  }

  parent.children = dom;

  for (var i = 0; i < dom.length; i++) {
    var node = dom[i];
    node.parent = parent;
  }

  return parent;
};

var Parser = (content, selector, type) => {
  if (type === 'xml') {
    return xmlParser(content, selector);
  } else if (type === 'html') {
    return htmlParser(content, selector);
  } else {
    throw new Error('type must be "html" or "xml"');
  }
};

module.exports = Parser;
