const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/dbd1c35ce04a1f624c728e200a39651b/" +
    latitude +
    "," +
    longitude +
    "?units=si&lang=en";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect weather service", undefined);
    } else if (body.error) {
      callback("unable to find the location", undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          " it is currently " +
          body.currently.temperature +
          " out. There is a " +
          body.currently.precipProbability * 100 +
          "% chance of rain."
      );
    }
  });
};

module.exports = forecast;
