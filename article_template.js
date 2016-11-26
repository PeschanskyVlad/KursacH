var mongoose    = require('mongoose');
var Schema = mongoose.Schema;

// Schemas
var Article = new Schema({
    aname : {
      type : String,
      unique : true,
      required : true,
    },

    address : {
      type : String,
      unique : true,
      required : true,
    },

    acategory : {
      type : String,
      required : true,
    },
    asummary : {
      type : String,
      required : true,
    },
    atext : {
      type : String,
      required : true,
    },
    arating : {
      type : Number,
    },
    image : {
      type : String
    },
});

var ArticleTemplate = mongoose.model('articles', Article);

module.exports.ArticleTemplate = ArticleTemplate;
