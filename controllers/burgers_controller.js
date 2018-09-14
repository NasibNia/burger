var burger = require ("../models/burger.js");
var express= require("express");
var router = express.Router();

//get all the burgers
router.get("/" , function(req,res){
    burger.selectAll(function(data){
        console.log("idiot" ,data);
        res.render("index" , {allBurgers : data});
    });

});

//insert a new burger
router.post("/api/burgers/" , function(req,res){

    burger.insertOne({
        burger_name : req.body.burger_name,
        devoured    :  req.body.devoured
    }, function(data){
        // sends back the id of new inserted object into data base
        res.json({id : data.insertId});
    });  
});

//update a new burger
router.put("/api/burgers/:id", function(req,res){

    var id = req.params.id;
    
    var condition = "id="+id;

    burger.updateOne({
        devoured    : req.body.devoured
        }, condition , function(data){
            if (data.changedRows === 0) {
                // If no rows were changed, then the ID must not exist, so 404
                console.log("nothing changed")
                // return res.status(404).end();
              } else {
                res.status(200).end();
              }
        }
    );

});



module.exports = router;