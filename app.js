const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
})
.help()
.alias('help', 'h')
.argv;

var userAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${userAddress}`;

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Google Maps API could not locate this address');
  }
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.darksky.net/forecast/1c9cd2068e1c2c6663bdf556ddce7dbc/${lat},${lng}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`);
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to google maps API');
  } else {
    console.log(e.message);
  }
});
