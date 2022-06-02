var express =require('express')
var app=express();
var mongoose=require('mongoose')
var bodyparser=require('body-parser')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
var jwt = require("jsonwebtoken");
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
var cors=require('cors');
app.use(cors())
var cookieparser=require('cookie-parser');
const { ObjectId } = require('mongodb');
app.use(cookieparser())
var dbURL='mongodb+srv://brahmamma:brahmamma@cluster0.ypayr.mongodb.net/smsapp?retryWrites=true&w=majority';
mongoose.connect(dbURL)
var courseschema=new mongoose.Schema({
coursename:String,
coursefees:Number,
courseduration:String,
courselevel:String
}
)
var Courses=mongoose.model('Courses',courseschema);

var dummyregsiterschema=new mongoose.Schema({
    username:String,
    password:String,
    email:String
})
var dummyregisters=mongoose.model('Dummyregisters',dummyregsiterschema)
var regsiterschema=new mongoose.Schema({
    username:String,
    password:String,
    email:String
})
var registers=mongoose.model('registers',regsiterschema)

var dummyregcoursesschema=new mongoose.Schema({
    uid:ObjectId,
    cid:ObjectId,
    username:String,
    coursename:String,
    cooursefee:Number
})
var dummyregcourses=mongoose.model('Dummyregcourses',dummyregcoursesschema)
var regcoursesschema=new mongoose.Schema({
    uid:ObjectId,
    cid:ObjectId,
    username:String,
    coursename:String,
    cooursefee:Number
})
var Regcourses=mongoose.model('Regcourses',regcoursesschema)

app.post("/auth_admin", function (req, res) {
      if ('admin' === req.body.username &&'123' === req.body.password) {
      var token = jwt.sign(req.body, "studentadmin");
      res.send({ msg: "success", token });
      }
      else {
        res.send({ msg: "failed" });
      }
    });

    app.post("/reg_student", function (req, res) {
        
    var user= new dummyregisters({
        username:req.body.username,
        password:req.body.password,
        email:req.body.email
    })
    user.save(function(err,d){
        if(err){
            res.send({msg:'failed'})
        }
        else{
            res.send({msg:'success'})
        }
    })
    });
    app.post("/add_registers", function (req, res) {
        
        var user= new registers({
            username:req.body.username,
            password:req.body.password,
            email:req.body.email
        })
        user.save(function(err,d){
            if(err){
                res.send({msg:'failed'})
            }
            else{
                res.send({msg:'success'})
            }
        })
        });
    app.post("/add_course", function (req, res) {
        
        var course= new Courses({
            coursename:req.body.coursename,
            courseduration:req.body.courseduration,
            coursefees:req.body.coursefees,
            courselevel:req.body.courselevel
        })
        course.save(function(err,d){
            if(err){
                res.send({msg:'failed'})
            }
            else{
                res.send({msg:'success'})
            }
        })
        });
        app.get("/get_courses",function(req,res)
        {
    Courses.find({},function(err,data)
    {
        if(!err)
        {   
            res.send(data);
        }
    })
        })
        app.get("/get_regcourses",function(req,res)
        {
    Regcourses.find({},function(err,data)
    {
        if(!err)
        {   
            res.send(data);
        }
    })
        })
    app.get("/get_dummyregisters",function(req,res)
    {
    dummyregisters.find({},function(err,data)
    {
        if(!err)
        {   console.log(data)
            res.send(data);
        }
    })
        })

        app.get("/get_dummy",function(req,res)
        {
            
        dummyregisters.find({},function(err,data)
        {
            if(!err)
            { 
                res.send(data);
            }
        })
            })


            app.get("/get_original",function(req,res)
            {
            registers.find({},function(err,data)
            {
                if(!err)
                {  
                    res.send(data);
                }
            })
                })


    
    app.post("/req_course", function (req, res) {
        var obj= new dummyregcourses({
            uid:req.body.u._id,
            cid:req.body.c._id,
            username:req.body.u.username,
            coursename:req.body.c.coursename,
            coursefee:req.body.c.coursefees
        })
        obj.save(function(err,d){
            if(err){
                res.send({msg:'failed'})
            }
            else{
                res.send({msg:'success'})
            }
        })
        });
        app.get('/get_dummycourseregisters',function(req,res){
            dummyregcourses.find({},function(err,d){
                if(!err){
                    res.send(d)
                }
            })
        })
        
        app.post("/add_registerdcourses", function (req, res) {
            var obj= new Regcourses({
                uid:req.body.uid,
                cid:req.body.cid,
                username:req.body.username,
                coursename:req.body.coursename,
                coursefee:req.body.coursefee
            })
            obj.save(function(err,d){
                if(err){
                    res.send({msg:'failed'})
                }
                else{
                    res.send({msg:'success'})
                }
            })
            });
            app.delete('/del_cou_reg_request/:id',function(req,res){
                dummyregcourses.findByIdAndDelete(req.params.id,function(err,data){
                    if(!err){
                        console.log("deleted")
                    }
                })
            })
            app.delete('/del_reg_request/:id',function(req,res){
                dummyregisters.findByIdAndDelete(req.params.id,function(err,data){
                    if(!err){
                        console.log("deleted")
                    }
                })
            })

app.listen(process.env.PORT)