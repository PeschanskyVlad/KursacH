var mongoose    = require('mongoose');
var Schema = mongoose.Schema;


var User = new Schema({
    username : {
      type : String,
      unique : true,
      required : true,
    },
    email : {
      type : String,
      required : true,
    },
    password : {
      type : String,
      required : true,
    },
    image : {
      type : String
    },

});


module.exports.UserModel = mongoose.model('users', User);
