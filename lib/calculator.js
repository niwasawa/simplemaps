'use strict';

var qs = require('querystring');
var request = require('request');
var xml2js = require('xml2js');

/**
 * Calculate latitude and longitude.
 * ref. http://developer.yahoo.co.jp/webapi/map/openlocalplatform/v1/static.html
 */
class Calculator {

  constructor(mapspec, appid) {
    this.mapspec = mapspec;
    this.appid = appid;
  }

  getLatLon(lat, lon, z, dx, dy, callback) {

    var pp = {
      lat: lat,
      lon: lon,
      z: z,
      dx: dx,
      dy: dy,
      appid: this.appid,
      output: 'xml',
      width: this.mapspec.width,
      height: this.mapspec.height,
      autoscale: 'off'
    };

    var base_url = 'http://map.olp.yahooapis.jp/OpenLocalPlatform/V1/static';
    var url = base_url + '?' + qs.stringify(pp);

    var self = this;

    request(url, function(error, response, body){

      if(error && response.statusCode != 200){
        callback(error, null);
        return;
      }

      self._responseToParams(body, function(err, params){
        if(err){
          callback(err);
        }else{
          callback(null, params);
        }
      });

    });
  }

  _responseToParams(xmlResponse, callback){

    var opts = {
      trim: true,
      explicitArray: false
    };

    xml2js.parseString(xmlResponse, opts, function(err, result){

      try{
        var r = result.ResultSet.Result;
        var c = r['Coordinates']['_'].split(',');
        var ul = r['Coordinate-UL']['Coordinates']['_'].split(',');
        var dr = r['Coordinate-DR']['Coordinates']['_'].split(',');
    
        // 戻り値
        var data = {
          // 中心緯度経度
          lat: c[1],
          lon: c[0],
          // 地図画像上下緯度
          uplat: ul[1],
          downlat: dr[1],
          // 地図画像左右経度
          leftlon: ul[0],
          rightlon: dr[0],
          // ズームレベル
          z: r.Scale.$.zlevel
        };
    
        callback(null, data);
  
      }catch(e){
        callback(e, null);
      }
    });
  }
}

module.exports = Calculator;

