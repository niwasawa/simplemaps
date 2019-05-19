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

    var base_url = 'https://map.yahooapis.jp/map/V1/static';
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
    
        // return value
        var data = {
          // lat and lon of center
          lat: c[1],
          lon: c[0],
          // latitudes of up and bottom of map image
          uplat: ul[1],
          downlat: dr[1],
          // longitudes of left and right of map image
          leftlon: ul[0],
          rightlon: dr[0],
          // zoom level
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

