const express = require('express')
var bodyParser = require('body-parser')

const conf = require('./config.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/'+conf.db);
var DataTable = require('mongoose-datatable');
mongoose.plugin(DataTable.init);

const user = require('./user.js');
const comment = require('./comment.js');

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


app.get('/', (req, res) => {
		res.send('Hello World!')
});
app.post('/user',(req,res)=>{
	var qr={};
	if(req.query)
	{
		qr=req.body;
	}	
	user.find(qr,(err,data)=>{
		res.send(data);
	})
});

app.post('/userdt',()=>{
	var qr=req.body;
	user.dt(qr,(err,data)=>{
		res.send(data);
	});
})

app.post('/comment',(req,res)=>{
	var qr={};
	if(req.query)
	{
		qr=req.body;
	}	
	comment.find(qr,(err,data)=>{
		res.send(data);
	})
});

app.post('/commentdt',()=>{
	var qr=req.body;
	comment.dt(qr,(err,data)=>{
		res.send(data);
	});
})
app.listen(conf.port, () => console.log('Example app listening on port '+conf.port+'!'));
