var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var crypto = require('crypto');
var UserTemplate = require('../user_template').UserTemplate;

/* Crypt function. */
var salt = 'datismysalt1998!';
function hash(pass){
  return crypto.createHash('md5').update(pass + salt).digest("hex");
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main');
});

/* GET register page. */
router.get('/register', (req, res) => {
  res.render('register');
});

/* GET login page. */
router.get('/login', (req, res) => {
  res.render('login');
});


/* POST login function. */
