//jshint esversion:6

const dotenv=require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ =require("lodash");
const mongoose=require("mongoose");
const app = express();

const MONGOURL = process.env.MONGODB_URL;
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// mongoose.connect("mongodb://localhost:27017/ArFitnessDB")
mongoose.connect(MONGOURL)
.then(()=>{
  console.log("successfully connected");
  }).catch((e)=>{
  console.log("not connected");
  });


const YogaSchema ={
  name: String,
  imgURL: String,
  benifit: String
};

const Yoga= mongoose.model("Yoga",YogaSchema);

let yogas=[];

app.get("/", function(req,res){
  Yoga.find({}).then((yoga)=>{
    yogas=yoga;
    
    res.render("home",{
      yogaContent: yoga.toSpliced(-1,1)
    });
  }).catch(err=>{
    console.log(err);
  })
});

app.get("/ar/:topic",(req,res)=>{
  
  yogas.forEach((ele)=>{
    if(_.lowerCase(ele.name)===_.lowerCase(req.params.topic)){
      res.render("arpage",{imgURL:ele.imgURL});
    }
  })
})

// app.get("/arhandling",(req,res)=>{
//     res.render("arpage");
// })

app.get("/setupar",(req,res)=>{
  res.render("setup");
});



app.listen(4000, function() {
  console.log("Server started on port 4000");
});
