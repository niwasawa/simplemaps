'use strict';

/**
 * Zoom level.
 */
class ZoomLevel {

  constructor(min_z, max_z) {
    this.min_z = min_z;
    this.max_z = max_z;
  }

  getZMinus(z) {
    var zminus = parseInt(z) - 1;
    if (zminus < this.min_z) {
      zminus = this.min_z;
    }
    return zminus;
  }

  getZPlus(z) {
    var zplus = parseInt(z) + 1;
    if (zplus > this.max_z){
      zplus = this.max_z;
    }
    return zplus;
  }
}

module.exports = ZoomLevel;

