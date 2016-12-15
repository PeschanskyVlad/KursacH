var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var mpromise = require('mpromise');
var crypto = require('crypto');
var UserTemplate = require('../user_template').UserTemplate;
var ArticleTemplate = require('../article_template').ArticleTemplate;

var mongo_db = 'mongodb://localhost/kursach';
var csrf = require('csurf');


mongoose.connect(mongo_db);

const bodyParser = require('body-parser');
const busboyBodyParser = require('busboy-body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');

let sessionSecret = "jahdgalsdg^&(*&^%  _Asds)";

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(busboyBodyParser({ limit: '10mb' }));
router.use(cookieParser());


router.use(session({
	secret: sessionSecret,
	resave: false,
	saveUninitialized: false
}));


router.use(passport.initialize());
router.use(passport.session());

router.use(csrf());


passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
	console.log("deserializeUser id: " + id);
	UserTemplate.findOne({ _id: id}).exec((err, user) => {
    if(err){
      done(err, null);
    } else {
      if(user) {
				done(null, user);
			} else {
				done("No user", null);
			}
    }
  });
});


passport.use(new LocalStrategy((username, password, done) => {

	  UserTemplate.findOne({
			  username: username,
			  password: hash(password)
		  }).exec((err, user) => {
        if(!err){
          console.log(user);
  				if (user) {
  					done(null, user);
  				} else {
  					done(null, false);
  				}
        } else {
          console.log(err);
  				done(err, null);
        }
      });
}));


var salt = 'datismusalt1998!';

function hash(pass){
  return crypto.createHash('md5').update(pass + salt).digest("hex");
}

/* GET home page. */

router.get('/', function(req, res, next) {
	 res.render('main', {user : req.user});
});

router.get('/new_article', function(req, res, next) {
	if(req.user){

	ArticleTemplate.find({},{acategory : true, _id : false}).exec(
		function(err,articles){
			if(err){
				console.log('Error.');
			}else{

				var tempArr = [];

				var row='';
				for (var i in articles) {

					if(tempArr.indexOf(articles[i].acategory)==-1){
						 row+= articles[i].acategory+',';
					 }


						 tempArr[i] = articles[i].acategory;
					 };


						 row = row.slice(0, -1);


					res.render('new_article', {user : req.user, categorys : row});
			}

	})
 } else {res.end('Nope');}
});

router.get('/articles', function(req,res,next){
	ArticleTemplate.find({})
	.exec(function(err,articles){
		if(err){res.send('err');}else{


			//So long function, wow
			/*
			var list="";
			var tempArr = [];
		  var ABC = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","S","Y","Z"];

		 for (var c = 0; c<ABC.length ; c++){
		 list+=  "&nbsp&nbsp&nbsp&nbsp"+ABC[c]+":<br>";
		 	for (var i in articles) {

		 if(articles[i].acategory.charAt(0).toUpperCase()==ABC[c]){

		 	var temp = articles[i].acategory;

		 		if(tempArr.indexOf(articles[i].acategory)==-1){

		 		list+="&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+articles[i].acategory+":<br>";
		 		 for (var j in articles) {
		 			 if(articles[j].acategory == temp){
		 			list+="&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<a href = "+articles[j].address+ ">"+articles[j].aname+"</a><br>";
		 			 }
		 			 };
		 		}
		 			 tempArr[i] = articles[i].acategory;

		 			}
		 		 };
		 list+= " <hr>";
	 }*/

			//finally

			res.render('articles', {user : req.user, ar : articles});
		}

	})



});

/* GET register page. */
router.get('/register', (req, res) => {
  res.render('register');
});

router.delete('/articles/:title', function(req,res){
	if(req.user.admin == true){
	var temp = '/articles/'+ req.params.title;
	ArticleTemplate.findOneAndRemove({
		address : temp
	},function(err,article){
		if(err){
			res.send('Delete error')
		}else{
			res.redirect('/');
		}
	})
}else{
	res.end('Nope');
}
});

router.get('/articles/:title', function(req,res){
//	console.log('here');
 	var temp = '/articles/'+ req.params.title;
	console.log(temp);
	ArticleTemplate.findOne({
		address : temp
	})
	.exec(function(err,article){
		if(err){res.send('err occured');}
		if(article){
			console.log(article);
			res.render('article', {user : req.user,ar : article});
		}else{
			res.send('Not found');
		}
	})
})

/* GET login page. */
router.get('/login', (req, res) => {
  res.render('login',{csrfToken : req.csrfToken()});
});

/* GET register_success page. */
router.get('/register_success', (req, res) => {
  res.render('register_success');
});

/* GET new article page.
Only for registered users*/
/*router.get('/new_article', (req, res) => {
	if(req.user){
  res.render('new_article');
	} else {res.end('Nope');}
});*/

/* GET logout.
Only for registered users*/
router.get('/logout', (req, res) => {
	if(req.user){req.logout();
	res.redirect('/');
	} else {res.end('Nope');}
});

/*POST login*/
router.post('/login',
	passport.authenticate('local', { failureRedirect: '/login-error' }),
  (req, res) => res.redirect('/'));

router.get('/login-error', (req, res) => res.render('error', {error : 'Login error'}));


router.get('/user_profile', (req, res) => {
	if(req.user){
		res.render('user_profile', {user : req.user});
	} else {res.end('Nope');}
});

router.get('/article_success', (req, res) => {
	if(req.user){
	res.render('article_success' ,  {user : req.user});
	} else {res.end('Nope');}
});



/*POST ubdate profile.*/
router.post('/user_profile',(req,res) => {
	if(req.body.email&&req.body.password&&
		req.body.password2&&req.body.password === req.body.password2){

			//console.log('Here');
			var avaObj = req.files.avatar;
			var base64String = avaObj.data.toString('base64');

			if (!base64String) base64String=req.user.image;

			UserTemplate.findOneAndUpdate({username : req.user.username},{
						$set:{
				      email : req.body.email,
				      password : hash(req.body.password),
				      image : base64String
						}},
						{new : true},
							function(err,newBook){
								if(err){
									console.log('Update error!');
								}else{
									console.log('Update success!');
									res.redirect('/user_profile');
								}
							}
						)
		}else{
			res.redirect('/user_profile');
		}
});



router.post('/new_article',(req,res) =>{

	console.log('Here');

	if(req.body.atitle&&req.body.acategory){
			console.log('Here2');

			ArticleTemplate.findOne({aname : req.body.atitle},function(err,article){
			if(err) return next(err);
			if(article){
			res.end("Such article title exists");
		}else{

			var aObj = req.files.image;
			var base64String = aObj.data.toString('base64');

			var adressObj = '/articles/'+req.body.atitle.replace(/ /g,'_');




			var new_article = new ArticleTemplate({
				aname : req.body.atitle,
				address : adressObj,
				acategory : req.body.acategory,
				asummary :  req.body.asummary,
				atext :  req.body.atext,
				arating : 0,
				image : base64String,
				});

				new_article.save((err) => {
					if(!err){

						res.redirect('/article_success');

					} else {
						console.log(err);
						if(err.name == 'ValidationError') {
										res.render('error', {error : '400. Validation error'});
								 } else {
										 res.render('error', {error : '500. Server error'});
								 }
					}
				});
		}
			})
		}else{
			res.redirect('/new_article');
		}
});

/* POST register. */
router.post('/register', (req, res) => {
if(req.body.username&&req.body.email&&req.body.password&&
	req.body.password2&&req.body.password === req.body.password2){

		UserTemplate.findOne({username:req.body.username},function(err,user){
			if(err) return next(err);

			if(user){
			res.end("Such username exists " + JSON.stringify(user));
			}else{

				var avaObj = req.files.avatar;
			  var base64String = avaObj.data.toString('base64');

		    var new_user = new UserTemplate({
		      username : req.body.username,
		      email : req.body.email,
		      password : hash(req.body.password),
		      image : base64String,
					admin : false,
		      });

					new_user.save((err) => {
						if(!err){

							res.redirect('/');

						} else {
							console.log(err);
							if(err.name == 'ValidationError') {
											res.render('error', {error : '400. Validation error'});
									 } else {
											 res.render('error', {error : '500. Server error'});
									 }
						}
					});



			}
		})

    } else {
      res.render('error', { error : 'Invalide data. Please fill fields correctly.'});
    }
});

module.exports = router;
