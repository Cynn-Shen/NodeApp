
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017/test'); //连接test数据库
 
var Schema = mongoose.Schema; //创建模型
var studentSchema = new Schema({
    stuname: String,
    age: Number,
    sex: String,
    address: String
},{
    versionKey: false // You should be aware of the outcome after set to false
});
 
studentSchema.methods.addStu=function(student,callback){
    this.stuname = student.stuname;
    this.age = student.age;
    this.sex = student.sex;
    this.address = student.address;
    this.save(callback);
}
 
 
var student = db.model('Students',studentSchema);
//exports.student=student;
module.exports = student;
