var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  name: String


});

var user = mongoose.model('user', UserSchema);
module.exports = user;
