'use strict';

var qs = require('querystring');
var swig = require('swig');

class Utils {

  static escapeHtml(str) {
    str = str.replace(/&/g, '&amp;');
    str = str.replace(/</g, '&lt;');
    str = str.replace(/>/g, '&gt;');
    str = str.replace(/'/g, '&#39;');
    str = str.replace(/"/g, '&quot;');
    return str;
  }

  static forwardMatch(text, str) {
    return text.substr(0, str.length) === str;
  }

  static outputHtml(req, res, template_html, p){
    var template = swig.compileFile(template_html);
    var html = template(p);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(html);
    res.end();
  }

  static redirect(req, res, base_url, p){
    var url = base_url + '?' + qs.stringify(p);
    res.writeHead(301, {'Location': url});
    res.end();
  }

  static errorPage(req, res) {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end('<html><body>404 not found</body></html>\n');
  };

}

module.exports = Utils;

