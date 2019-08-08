const request = require('request');

const geocode = (address, cb) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibmV2cmlrIiwiYSI6ImNqeXVxZ3ZmcjBoaDQzbm96YWFyaWNnemUifQ.KmmVAFECdxLqSr5J6gCf_w&limit=1`;

  request({ url, json: true }, (err, res) => {
    if (err) {
      cb('Unable to connect to location services!', undefined);
    } else if (!res.body.features.length) {
      cb('Unable to find location. Try another search :)', undefined); 
    } else {
      const geoInfo = res.body.features[0];
      const latitude = geoInfo.center[1]; 
      const longitude = geoInfo.center[0];
      const location = geoInfo.place_name;

      cb(undefined, {
        latitude,
        longitude,
        location
      });
    }
  });
};

module.exports = geocode;