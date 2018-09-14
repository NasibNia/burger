
<!-- Put the name of the project after the # -->
<!-- the # means h1  -->
# Your Burger!

<!-- Put a description of what the project is -->

Hello Full Stack! I'm here!

This fun project is my first full stack app, holding together the pieces of client side and the server! It is a burger application which lets the customers get and update the information about the burgers already made by the restuerant, as well as requesting a toatlly new burger in the menu. The application is connected to mysql and reads and stores data in real time. Every time the customer lands on the main page, they would be able to see the list of items already on menu, upon adding a new item, it would pop up on the menu and will be saved in the databas. 

On the serve side application has a modular arcitecture; here is a quick snapshot of different modules used to enable the server to sync with the the front end and respond to the requests in a proper way:

* Config:
    * * include connection module that makes the connection to mysql database through proper channels depending whether the app is running as a deployed app or locally on the machine. 
    * * Orm file create and exports the orm object which is the main heart of the connection queries to the database, it has different functions which will be called on later on when the data is requested by client; whether it is requesting all data or updating an already existing one or adding a new one to the data base; the query to database happens in the functions built in the orm object. each function has a callback function passed to it as an argument to save in the information. This will enable that us to run some callback functions only after the query is completed and data got back.
* models:
    * * include the controller module which sits between the routers and ORM queries functions and uses orm functions to does the query for a specific category of model which in this case is only burgers. This controllers could contain different files defining the behavior of different objects all through the same orm set up.
    Similar to orm functions; each function inside the model has a callback function passed in as argument to be executed after the query results are back.
* Controllers:
    * * controllers is where the routs to different queries are defined. After getting the request form the client side, the servers looks into appropriate route set up in this controller file, then it calls on the appropriate function in the model module (burger.js) here which itself calls on appropriate function defined in orm. Data gets back from the orm and be passed to the model function which itself passed the results to the controlles fucntion. Meanign server gets the data relted to the initial request that client made. Then depends on what is the request the data will be used accordingly.
* db
    * * Contains the schema and seeds file regarding our data base
* PUblic
    * * Contains the files related to the client side that could be seen as publicly as well, including the images, css and the client side javascripts, which are essentially javascript command related to html on-click events or making ajax calls to the api routes.
* views:
    * * contains the handlebars:
    Handle bars are an intresting way of making html templates. These templates will be used in the controller rout maker to render the data to the fron end. 
    

# Link to deployed site

YRBURGER is YOUR BURGER!(https://yrburger.herokuapp.com/)
<!-- make a link to the deployed site --> 
<!-- [What the user will see](the link to the deployed site) -->


This program is not deployed and is run on the console.


# Images
<!-- take a picture of the image and add it into the readme  -->
<!-- ![image title](path or link to image) -->
![burger](https://media.giphy.com/media/WBTUlyKBVlTTa/giphy.gif)
<!-- ![[burger](./public/assets/img/YRBURGER.gif) -->


# technology used
<!-- make a list of technology used -->
<!-- what you used for this web app, like html css -->

<!-- 
1. First ordered list item
2. Another item
⋅⋅* Unordered sub-list. 
1. Actual numbers don't matter, just that it's a number
⋅⋅1. Ordered sub-list
4. And another item. 
-->
- Making a server 
- javascript
- node.js
- API calls from front end to the server
- promise functions
- call backs
- error handling
- handlebars
- npm
- modular design of backend through orm, controllers, modles
- using templates for front end using handlebars



# code snippets
<!-- put snippets of code inside ``` ``` so it will look like code -->
<!-- if you want to put blockquotes use a > -->

This block of the code shows the orm object that has three functions to make the query to the database; each function has a specific query string depending on the type of data we need to get back from the mysql data base.
As mentioned above each function has a callback function passed into it. This is a way of assuring that we will have access to the query results outside of these functions.
```
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
```

This block of the code belonges to the model object : burger.js. The object uses the orm functions to do certain type of queries inside a specific table of "burgers" in the database.

```
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
```
The following three code snippets belong to controllers: where different routes are beign made in the server side and the associated response to each is defined:

* * * function "get" for the route "/" : which essentially gets all the data of our burger database and render the results in the index handlebars by passing data as the value of a bew object with the key "allBurgers"
```
//get all the burgers
router.get("/" , function(req,res){
    burger.selectAll(function(data){
        console.log("idiot" ,data);
        res.render("index" , {allBurgers : data});
    });

});
```
* * * function "post" that adds the new burger to the list
```
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
```
* * * function "put" to update the current data on the page
```

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
```
# Learning points
<!-- Learning points where you would write what you thought was helpful -->
- Making a server 
- javascript
- node.js
- API calls from front end to the server
- promise functions
- call backs
- error handling
- handlebars
- npm
- modular design of backend through orm, controllers, modles
- using templates for front end using handlebars




# Author 
<!-- make a link to the deployed site and have your name as the link -->
Nasibeh Nourbakhshnia
(www.linkedin.com/in/nasibehnourbakhshnia)

# License
