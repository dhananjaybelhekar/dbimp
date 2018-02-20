var express = require('express');
var bodyParser = require('body-parser');
var { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
var { makeExecutableSchema } = require('graphql-tools');
const fetch = require('node-fetch')
const util = require('util');
const graphqlHTTP = require('express-graphql');

//var async =require('async');


const mongoose = require('mongoose');
 var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/tw-UAT-20161212');


const Per = mongoose.model('Txn_personnel',{});

const typeDefs = `
  type Query {
    emp(_id:String!):DEmp,
    empget:[DEmp]

  },type DEmp{
    _id:String
    sequenceNumber:Int
    titleMasterName:String
    title:String
  },
  type  Emp{
    id:Int
    postId:Int
    name:String
    email:String
    body:String
    website: String
    company:Company
    address:Address
  },  
   type Address{
      street: String
      suite: String
      city: String
      zipcode: String
       geo:Geo
     },
    type Geo{
        lat: String
        lng: String
      },
      type  Company {
        name: String
        catchPhrase: String
        bs: String
    }
`;

const resolvers = {
  Query:{
    empget:function(){
        return new Promise((resolve, reject) => {
              Per.find({}).exec(function(err,data){
                resolve(JSON.parse(JSON.stringify(data)));
              })  
            });
},
    emp:function(root,id){
      console.log('lll=>',id);
        return new Promise((resolve, reject) => {
              Per.find({"_id" : new mongoose.Types.ObjectId(id._id)}).exec(function(err,data){
                console.log(data);
                resolve(JSON.parse(JSON.stringify(data[0])));
              })  
            });
}
  }
};
var schema = makeExecutableSchema({typeDefs, resolvers});
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

app.use('/all',graphqlHTTP(req=>{
    return {
      schema: schema,
      rootValue: resolvers,
      graphiql: true
    }
}));


app.listen(4000, () => console.log('Now browse to localhost:4000/graphiql'));
