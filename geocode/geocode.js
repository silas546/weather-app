const request = require('request');

// encode user argument -a into googleapi readable JSON
var geocodeAddress = (address, callback) => {
  var userAddress = encodeURIComponent(address);

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${userAddress}`,
    json: true
  }, (error, response, body) => {
    if (error){
      callback('Unable to connect to Google servers.');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Address not found.');
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
  }
  });
};

module.exports = {
  geocodeAddress
};
