var express = require('express');
var bodyParser = require('body-parser');
var { makeExecutableSchema } = require('graphql-tools');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.1.4/test');


 var Schema = mongoose.Schema;
//var { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
//const fetch = require('node-fetch')
//const util = require('util');
//var async =require('async');

var app = express();
app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
});




///////////////////////////// MONGODB schema///////////////////////////////////////////////


const Per = mongoose.model('cat',new Schema({
  id:Number,
  name:String,
  username:String,
  email:String,
  phone:String,
  website:String,
  address:{
      street:String,
      suite:String,
      city:String,
      zipcode:String,
      geo:{
            lat:String,
            lng:String
          }
  },
  company : {
      name:String,
      catchPhrase : String,
      bs : String,
  }
}));

/////////////////////////////GRAPH QL///////////////////////////////////////////////


//GRAPH QL SCHEMA
const typeDefs = `
  type Query {
    empget:[user],
    emp(id:Int!):user

  },
  type Address{
    street :String
    suite :String
    city :String
    zipcode :String
    geo:Geo
  },
  type Geo{
    lat:String
    lng:String
  },
  type Company{
        name : String
        catchPhrase : String
        bs : String
},
   type  user{
    address:Address
    company:Company
    name:String
    id:Int
    username :String
    email:String
    phone:String
    website:String
  }
`;

//GRAPH QL resolvers
const resolvers = {
  Query:{
    empget:function(){
       return new Promise(function(resolve, reject){
            Per.find({}).exec(function(err,data){
                resolve(data);
              });
       });
        
    },
      emp:function(root,data){
      return new Promise(function(resolve, reject){
            Per.find({id:data.id}).exec(function(err,data){
                resolve(data[0]);
              });
       });
  }
  }
};

//GRAPH QL mapping schema and resolvers
var schema = makeExecutableSchema({typeDefs, resolvers});




app.use('/all',graphqlHTTP(req=>{
  console.log(req.body)
    return {
      schema: schema,
      rootValue: resolvers,
      graphiql: true
    }
}));

app.get('/user',(req,res)=>{
  Per.find({}).exec(function(err,data){
                res.send(data);
              });
});

app.listen(4000, () => console.log('Now browse to localhost:4000/graphiql'));


