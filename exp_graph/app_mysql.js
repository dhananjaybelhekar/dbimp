const express = require('express')
var mysql      = require('mysql');
var bodyParser = require('body-parser')
var { makeExecutableSchema } = require('graphql-tools');
const graphqlHTTP = require('express-graphql')
var async = require('async');
var typeDefs= require("./schema.js");


const app = express()
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
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'temp'
});

connection.connect();

app.post('/dt',function(req,res){
	var data = req.body;
	//var QR= "SELECT * FROM employee limit "+ data.start +","+data.length;
	var QR= {
		_where:"",
		_limit:""
	};
	if(data.search.value != '')
	{
		QR._where+=" where Name LIKE '%"+ data.search.value +"%'"
	}
	if(data.start>=0 && data.length)
	{
		QR._limit+=" LIMIT "+data.start+", "+data.length;
	}
	console.log("///////////////////////////////////////////////////////");
	console.log("QR=",QR);
	async.waterfall([
    function(callback) {
    	var data={};
        connection.query("SELECT COUNT(Name) as count FROM employee "+QR._where, function (error, results, fields) {
		  if (error) throw error;
		  data.recordsFiltered=JSON.parse(JSON.stringify(results))[0].count;
		  data.recordsTotal=JSON.parse(JSON.stringify(results))[0].count;
		  data.draw=1;
		  callback(null, data);
		});	
    },
    function(arg1, callback) {
        // arg1 now equals 'one' and arg2 now equals 'two'
        connection.query("SELECT * from employee"+QR._where+QR._limit, function (error, results, fields) {
		  if (error) throw error;
		  arg1.data=results;
		  callback(null, arg1);
		});		   
    }
], function (err, result) {
	console.log("RESP",result);
    res.send(result);
});
})

app.post('/editUser',function(req,res){
	var data=req.body;
	console.log(data);
	connection.query("update employee set Name='"+ data.Name +"' , Phone='"+ data.Phone +"' where id="+data.id, function (error, results, fields) {
			  if (error) throw error;
			  res.send(results);
			});
});
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
	
		connection.query("INSERT INTO Employee (Name, Phone) VALUES ('"+ req.body.Name +"', '"+ req.body.Phone +"');", function (error, results, fields) {
		  if (error) throw error;
		  res.send(results);
		});
})




const resolvers = {
  Query:{
    empget:function(){
		return new Promise(function(resolve, reject){
		
						connection.query("SELECT * FROM employee", function (error, results, fields) {
						  if (error) throw error;
						  resolve(results);
						});		
		       });
    },
    empName:function(root,data){
    return new Promise(function(resolve, reject){
		
						connection.query("SELECT * FROM employee where Name='"+ data.name+"'", function (error, results, fields) {
						  if (error) throw error;
						  resolve(results);
						});		
		       });	
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