
const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

// return geocode.geocodeAddress(argv.a, (errorMessage, results) => {
//   if (errorMessage) {
//     console.log(errorMessage);
//   } else {
//     console.log(JSON.stringify(results, undefined, 2));
//   }
// });

weather.getWeather(36.4, -105.6, (errorMsg, weatherResults) => {
  if (errorMsg) {
    console.log(errorMsg);
  } else {
    console.log(JSON.stringify(weatherResults, undefined, 2));
  }
});
