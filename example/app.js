'use strict';

var http   = require('http');
var url    = require('url');
var simplemaps = require('simplemaps');

var config = {
  "server_port": 8888,
  "base_url": "/maps/",
  "template_html": "template.html",
  "appid": "<Your Application ID by Yahoo! JAPAN Developer Network>",
  "mapspec": {
    "width": 600,
    "height": 600,
    "min_z": 1,
    "max_z": 20,
    "default_lat": 35.170429,
    "default_lon": 136.882298,
    "default_z": 6
  }
};

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

