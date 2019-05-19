'use strict';

var ejs = require('ejs');
var qs = require('querystring');

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
    ejs.renderFile(template_html, p, function(err, str){
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(str);
      res.end();
    });
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

