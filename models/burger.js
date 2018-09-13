var orm = require("../config/orm.js");

var burger = {

    selectAll : function(callback){
        orm.selectAll("burgers" , function(data){
            callback(data);
        });
    },
    insertOne  : function(newBurger,callback){
        orm.insertOne("burgers",newBurger , function(data){
            callback(data);
        });
    },
    updateOne  : function(updateBurger, condition, callback){
        orm.updateOne("burgers", updateBurger, condition , function(data){
            callback(data);
        });

    }

};

module.exports = burger;