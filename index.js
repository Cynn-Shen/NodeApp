var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');

var student = require('../schema/mongodb.js');
/* GET home page. */
/* router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
}); */

router.get('/', function(req, res) {
	/* var studentCol = req.db.collection('Students');
	var query = {stuname: "Ada"};
	studentCol.find(query).toArray(function(err, items){
		if(err) throw err;
		items.forEach(function(item, index, arr){
			//res.render('layout', {Name: item.stuname, Age: item.age, Sex: item.sex, Address: item.address});
			res.render('index', {title:'Student Information Managemant System'});
		})
	}) */
	res.render('index', {title:'Student Information Managemant System'});
});
router.post('/index/list',function(req,res){
	var students = student.find({}, function(err, result){
		if(err)
			throw err;
		res.json(result);
	});
   /*  var students = student.find(function(err,result){
       if(err){
         res.send(err);
       }else{
          res.json(result);
       }
   }); */
});
 
router.post('/index/add',function(req,res){
    var obj = req.body;
    var stu02 = new student();
    stu02.addStu({
        stuname:req.body.stuname,
        age:req.body.age,
        sex:req.body.sex,
        address:req.body.address
    },function(rs){
        res.json({success:true});
    });
});
 
router.post('/index/delete',function(req,res){
    var id=req.body.id;
     
    student.remove({_id:id},function(){
        res.json({success:true});
    });
})
 
router.post('/index/edit/:id',function(req,res){
    console.log('aa');
    var id=mongoose.Types.ObjectId(req.params.id);
 
    student.update({_id:id},{$set:{stuname:req.body.stuname,age:req.body.age,sex:req.body.sex,address:req.body.address}},function(err,rs){
        if(err){
            console.log(err);
        }else{
            res.json({success:true});
        }
         
    });
 
})

module.exports = router;
