const request = require('request');

// print temp and ACTUAL temp
var getWeather = (lat, lng, callback) =>{

  request({
    url: `https://api.darksky.net/forecast/1c9cd2068e1c2c6663bdf556ddce7dbc/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200){
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    } else {
      callback('Unable to fetch weather from DarkSky');
    }
  });
};

module.exports = {
  getWeather
};
