'use strict';

var http   = require('http');
var url    = require('url');
var config = require('./appconfig.json');
var simplemaps = require('../index');

var server = http.createServer(function(req, res) {

  try{
    var pathname = url.parse(req.url).pathname;
    if (simplemaps.Utils.forwardMatch(pathname, config.base_url)) { 
      new simplemaps.WebApp(config).invoke(req, res);
    } else {
      simplemaps.Utils.errorPage(req, res);
    }
  }catch(e){
    console.error(e);
    console.trace(e);
    simplemaps.Utils.errorPage(req, res);
  }
});

server.listen(config.server_port);
console.log('Sample: Simple Maps Web Application Server started');
console.log('http://localhost:' + config.server_port + config.base_url);

