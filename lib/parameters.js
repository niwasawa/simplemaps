'use strict';

/**
 * Normalize input parameters from form.
 */
class Parameters {

  constructor(mapspec) {
    this.mapspec = mapspec;
  }

  /**
   * Normalize input parameters.
   */
  getNormalizedParameters(query) {

    var p = {};
    p.lat = this._num(query.lat, this.mapspec.default_lat);
    p.lon = this._num(query.lon, this.mapspec.default_lon);
    p.z   = this._num(query.z, this.mapspec.default_z);

    // dx and dy, pixel movement from center of the map
    var dxdy = this._dxdy(query['mapimage.x'], query['mapimage.y'], this.mapspec.width, this.mapspec.height);
    p.dx = dxdy.dx;
    p.dy = dxdy.dy;

    return p;
  }

  _dxdy(mapx, mapy, width, height) {
    if (mapx && mapy) {
      mapx = this._num(mapx, width  / 2);
      mapy = this._num(mapy, height / 2);
      return {
        dx: mapx - width  / 2,
        dy: mapy - height / 2
      };
    } else {
      return {dx: 0, dy: 0};
    }
  }

  /**
   * Check a parameter.
   */
  _num(x, def) {
    try {
      var xx = parseFloat(x);
      if (Number.isFinite(xx)) {
        return xx;
      } else {
        return def;
      };
    } catch (e) {
      console.log(e);
      return def;
    }
  }

  isMapClicked(p) {
    if (p['mapimage.x'] || p['mapimage.y']) {
      return true;
    }else{
      return false;
    }
  }

}

module.exports = Parameters;

