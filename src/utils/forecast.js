const request = require('request');

const forecast = ({ latitude, longitude, location }, cb) => {
  const url = `https://api.darksky.net/forecast/df7573a66c652eff6de98292bbd250dc/${latitude},${longitude}?units=si`

  request({ url, json: true }, (err, res) => {
    if (err) {
      cb('Unable to connect to weather service.', undefined);
    } else if (res.body.error) {
      cb('Unable to find location', undefined);
    } else {
      const { currently } = res.body;
      const { precipProbability, temperature, summary } = currently;

      cb(undefined, {
        location,
        summary,
        temperature,
        precipProbability
      });
    }
  });
};

module.exports = forecast;