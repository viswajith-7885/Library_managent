require('dotenv').config();
const express = require('express');
const mongoose =require('mongoose');
// const layoutexpress = require('express-ejs-layouts');
const expressEjsLayouts = require('express-ejs-layouts');
const multer = require('multer');
const path = require('path');

var bodyParser =require('body-parser');
const session=require("express-session");




const app=express();
const PORT =process.env.PORT || 5000;

app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
  }))


//express-ejs-middleware
app.use(expressEjsLayouts);
app.use(express.static('public'))
app.set('layout',"layouts/layout")

// body parser middleware
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use(bodyParser.json())

// database connection
mongoose.connect(process.env.DB_URI,{useUnifiedTopology:true});
const db =mongoose.connection;
db.on('error',(error)=>console.log(error));
db.once('open',()=>console.log("connected database"));

//multer storage....

const fileStorage = multer.diskStorage({
  destination:(req,file,cb)=>{
      cb(null,'public/images');
  },
  filename:(req,file,cb)=>{
      cb(null,file.fieldname+'-'+Date.now()+
      path.extname(file.originalname));
  }
});
const fileFilter = (req,file,cb)=>{
  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
      cb(null,true);
  }else{
      cb(null,false);
  }  
};


//multer require
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
app.use(multer({storage:fileStorage,fileFilter:fileFilter }).single('image'))

app.use((req,res,next)=>{
    res.locals.message = req.session.message
    delete req.session.message;
    next();
});

app.use(express.static('public/images'));

// set templaate engine
app.set("view engine","ejs");
//route prefix user
app.use("/",require('./routes/user'));
//route prefix admin
app.use("/admin",require('./routes/admin'));
//route prefix
// app.use("/category",require('./routes/category'));


app.listen(PORT,()=>{
    console.log("server started");
})
