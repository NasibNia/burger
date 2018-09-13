var connection = require ("./connection.js");

// helper functions:
//==============================================
//1 function to get an object and create a series of keys and values for sql request:
function colsVals(obj){
    var cols = "(" ;
    var vals = "(" ; 
    for (var keys in obj){
        cols += keys + ",";
        var value = obj[keys];
        if(typeof(value) === "boolean"){
            vals += value  + ",";
        } else{
            vals += '"'+ value + '"' + ",";
        }
    }
    cols = cols.slice(0, -1);
    vals = vals.slice(0, -1);
    cols += ")";
    vals += ")";
    return [cols,vals];
}
// var new1 = colsVals({name:"nasib", sex:"f" , happy:true});
// console.log(new1);
//=================================================
//  2) 
// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    } 
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }
//================================================

var orm = {
    selectAll : function(table , callback){
        var queryString = "SELECT * FROM " + table + ";";
        connection.query( queryString, function(err, data){
            if (err){
                console.log("error in selecting from database");
                throw err;
            }
            callback(data);
        });

    },
    insertOne : function(table, newInput ,callback){
        var toArray = colsVals(newInput);
        var cols = toArray[0];
        var vals = toArray[1];
        var queryString = "INSERT INTO "+ table + cols + " VALUES "+ vals;
        connection.query(queryString , function(err,data){
            if (err){
                console.log("error in selecting from database");
                throw err;
            }
            callback(data);
        });

    }, 
    updateOne : function(table, objColVals, condition, callback) {
        var queryString = "UPDATE " + table;   
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;
    
        console.log(queryString);
        connection.query(queryString, function(err, result) {
          if (err) {
            throw err;
          }
    
          callback(result);
        });
      },
};

module.exports = orm;

