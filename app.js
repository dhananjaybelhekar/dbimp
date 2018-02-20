var express = require('express');
var bodyParser = require('body-parser');
var { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
var { makeExecutableSchema } = require('graphql-tools');
const fetch = require('node-fetch')
const util = require('util');
const graphqlHTTP = require('express-graphql');

var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : '20180220'
});
connection.connect();




const typeDefs = `
  type Query {
    empget:[DEmp],
    emp(id:Int!):DEmp

  },type DEmp{
    id:Int
    name:String
    dept:String
    salary:Int
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

//var data = [{"postId": 1, "id": 1, "name": "id labore ex et quam laborum", "email": "Eliseo@gardner.biz", "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"}, {"postId": 1, "id": 2, "name": "quo vero reiciendis velit similique earum", "email": "Jayne_Kuhic@sydney.com", "body": "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"}, {"postId": 1, "id": 3, "name": "odio adipisci rerum aut animi", "email": "Nikita@garfield.biz", "body": "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione"}, {"postId": 1, "id": 4, "name": "alias odio sit", "email": "Lew@alysha.tv", "body": "non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati"}, ];

    var getAll=function()
    {
    return fetch('http://localhost:4000/data')
      .then(response => response.json())
      .then(json => {
          return new Promise((resolve, reject)=>{
            resolve(json);
                  });
        });  
    }
var find=function(root,id){
  return fetch('http://localhost:4000/find?id='+id.id)
  .then(response => response.json())
  .then(json => {
      return new Promise((resolve, reject)=>{
        resolve(json);
              });
    });  

  // var x=fetch('https://jsonplaceholder.typicode.com/users')
  // .then(response => response.json())
  // .then(json => {
  //   var p= new Promise((resolve, reject)=>{
  //       resolve(json);
  //   })
  // })
  // return data.filter(function(d1){
  //   return d1.id===id.id;
  // })[0];
  
}
const resolvers = {
  Query:{
    empget:getAll,
    emp:find
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

app.use('/graphql', bodyParser.json(), graphqlExpress(req => {
    return {
      schema: schema,
      context: {
        value: req.body.something,
      },
      // other options here
    };
  }));

app.get('/data',function(req,res){
  console.log('Api Data->');
  console.log(req.query);
  console.log(req.body);
connection.query('SELECT *from employee', function (error, results, fields) {
  if (error) throw error;
    res.send(results);
});  
});
app.get('/find',function(req,res){
  console.log('Api find->');
  console.log(req.query.id);
  console.log(req.body);
connection.query('SELECT *from employee where id='+req.query.id, function (error, results, fields) {
  if (error) throw error;
    console.log(results);
    res.send(results[0]);
});  
});

app.post('/g', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
}));


app.listen(4000, () => console.log('Now browse to localhost:4000/graphiql'));
