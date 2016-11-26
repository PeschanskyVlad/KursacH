var express = require('express');
var router = express.Router();

var UserTemplate = require('../user_template').UserTemplate;

/* GET users listing. */
router.get('/', function(req, res, next) {
  UserTemplate.find((err, users) => {
    if(!err){
      res.send('All users: \n' + users);
    } else {
      res.statusCode = 500;
      res.send('Server error');
    }
  });
});

module.exports = router;
