const express = require('express')
var mysql      = require('mysql');
var bodyParser = require('body-parser')
var { makeExecutableSchema } = require('graphql-tools');
const graphqlHTTP = require('express-graphql')
const app = express()
app.use(bodyParser.json())
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'temp'
});
connection.connect();
app.get('/', (req, res) => {
	connection.query('SELECT * FROM employee', function (error, results, fields) {
		  if (error) throw error;
		  res.send(results);
		});

})
app.post('/emp', (req, res) => {
	console.log(req.body);
	if(req.body.name){
		connection.query("SELECT * FROM employee where Name='"+ req.body.name+"'", function (error, results, fields) {
		  if (error) throw error;
		  res.send(results);
		});		
	}
	else
	{
		res.send("err");
	}
})
app.post('/saveEmp', (req, res) => {
	console.log(req.body);
	if(req.body.name){
		connection.query("INSERT INTO Employee (Name, Phone) VALUES ('"+ req.body.name +"', '"+ req.body.phone +"');", function (error, results, fields) {
		  if (error) throw error;
		  res.send(results);
		});		
	}
	else
	{
		res.send("err");
	}
})

const typeDefs = `
  type Query {
    empget:[user],
    empId(name:String!):[user]
  },
  type user{
  	Name:String
    Phone:String
  }
`;

const resolvers = {
  Query:{
    empget:function(){
		return new Promise(function(resolve, reject){
		
						connection.query("SELECT * FROM employee", function (error, results, fields) {
						  if (error) throw error;
						  resolve(results);
						});		
		       });
    },empId:function(root,data){
    	console.log(data);
		return new Promise(function(resolve, reject){
			connection.query("SELECT * FROM employee where Name='"+ data.name+"'", function (error, results, fields) {
				console.log(results);
				if (error) throw error;
					resolve(results[0]);
					});			
		});
				// return new Promise(function(resolve, reject){
		
				// 		connection.query("SELECT * FROM employee", function (error, results, fields) {
				// 		  if (error) throw error;
				// 		  resolve(results);
				// 		});		
		  //      });
    }
  }
};

var schema = makeExecutableSchema({typeDefs, resolvers});

app.use('/all',graphqlHTTP(req=>{
    return {
      schema: schema,
      rootValue: resolvers,
      graphiql: true
    }
}));


app.listen(3000, () => console.log('Example app listening on port 3000!'))