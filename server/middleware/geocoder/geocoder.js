// docs:https://github.com/nchaulet/node-geocoder
//im using mapQuest for the geocoding service
const NodeGeocoder = require('node-geocoder');

const options = {
  provider: process.env.GEOCODER_SERVICE,
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_APIKEY, // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
