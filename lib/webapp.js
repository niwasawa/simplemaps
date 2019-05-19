'use strict';

var qs = require('querystring');
var url = require('url');

var Utils = require('./utils');
var Parameters = require('./parameters');
var ZoomLevel = require('./zoomlevel');
var Calculator = require('./calculator');
var MapSpec = require('./mapspec');

class WebApp {

  constructor(config) {
    this.base_url = config.base_url;
    this.template_html = config.template_html;
    this.mapspec = new MapSpec(config.mapspec);
    this.appid = config.appid;
  }

  invoke(req, res) {

    var self = this;

    if (req.method !== 'GET') {
      Utils.errorPage(req, res);
      return;
    }

    // 入力パラメータ
    var parameters = new Parameters(this.mapspec);
    var u = url.parse(req.url, true);
    var p = parameters.getNormalizedParameters(u.query);

    if (parameters.isMapClicked(u.query)) {
      // 地図画像をクリック
      var calc = new Calculator(this.mapspec, this.appid);
      calc.getLatLon(p.lat, p.lon, p.z, p.dx, p.dy, function(err, data) {
        if (err) {
          console.log(err);
          Utils.errorPage(req, res);
        } else {
          Utils.redirect(req, res, self.base_url, {lat: data.lat, lon: data.lon, z: data.z});
        }
      });
    } else {
      // 地図画像をクリックしていない場合
      var zoomLevel = new ZoomLevel(this.min_z, this.max_z);
      var outp = {};
      outp.lat = p.lat;
      outp.lon = p.lon;
      outp.z = p.z;
      outp.zplus  = zoomLevel.getZPlus(p.z);
      outp.zminus = zoomLevel.getZMinus(p.z);
      outp.width = this.mapspec.width;
      outp.height = this.mapspec.height;
      outp.appid = this.appid;
      Utils.outputHtml(req, res, this.template_html, outp);
    }
  }
}

module.exports = WebApp;

