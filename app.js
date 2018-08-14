const request = require('request');
const yargs = require('yargs');

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

//encodes argument -a into googleapi readable JSON
var userAddress = encodeURIComponent(argv.a);

request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${userAddress}`,
  json: true
}, (error, response, body) => {
  console.log(`Address: ${body.results[0].formatted_address}`);
  console.log(`Latitude: ${JSON.stringify(body.results[0].geometry.location.lat, undefined, 2)}`);
  console.log(`Longitude: ${JSON.stringify(body.results[0].geometry.location.lng, undefined, 2)}`);
});
