var Model = require('./Model.js');

function Location() {
  var LocationSchema = {
    lng : Number,
    lat : Number
  };

  Model.call(this, LocationSchema);
  Model.extend(Location);
}

module.exports = Location;