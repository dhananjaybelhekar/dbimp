const mongoose = require('mongoose');
const conf = require('./config.js');
var DataTable = require('mongoose-datatable');


module.exports={
    conn:()=>{
        mongoose.connect('mongodb://localhost/'+conf.db);
        mongoose.plugin(DataTable.init);
    }
}