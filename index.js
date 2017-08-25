var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var RegisterSchema = require('../schema/registerSchema');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/add', function(req, res){
	var register = new RegisterSchema();
	register.addRegister({
		email: req.body.email,
		password: req.body.password,
		repassword: req.body.repassword
	}, function(err, res){
		if(err)
			throw err;
		else
			res.json({success: true})
	});
})
module.exports = router;
