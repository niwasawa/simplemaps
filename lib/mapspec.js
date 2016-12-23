'use strict';

class MapSpec {

  constructor(config) {
    this.width = config.width;
    this.height = config.height;
    this.min_z = config.min_z;
    this.max_z = config.max_z;
    this.default_lat = config.default_lat;
    this.default_lon = config.default_lon;
    this.default_z = config.default_z;
  }

}

module.exports = MapSpec;

