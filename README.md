
<!-- Put the name of the project after the # -->
<!-- the # means h1  -->
# Your Burger!

<!-- Put a description of what the project is -->

WOW! The first full stack app!

# Link to deployed site

YRBURGER is YOUR BURGER!(https://yrburger.herokuapp.com/)
<!-- make a link to the deployed site --> 
<!-- [What the user will see](the link to the deployed site) -->


This program is not deployed and is run on the console.


# Images
<!-- take a picture of the image and add it into the readme  -->
<!-- ![image title](path or link to image) -->
![burger](https://media.giphy.com/media/WBTUlyKBVlTTa/giphy.gif)
![[burger](assets/img/YRBURGER.gif)


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
- javascript
- node.js
- API calls
- promise functions
- call backs
- error handling
- moment.js
- node dotEnv
- node request
- Node Spotify API
- fs (file system)
- inquirer (.prompt)
- npm
- node modulus



# code snippets
<!-- put snippets of code inside ``` ``` so it will look like code -->
<!-- if you want to put blockquotes use a > -->

This block of the code shows the process of collecting inputs from the user and providing appropriate logic channels based on the validation analysis of those input as the following:

1) If neither action nor the search item is provided by the user, Liri will provide the list of actions to the user and also asks to enter a search item later on.
2) If the action is provided, Liri checks to see if it is among the acceptable ones; if so and if the asked request is  "concert this" Liri asks user to enter a search item. If action is either "spotify-this-song" or "movie-this" it will provide a default for the searchName. Then, it calls for the appropriate searching action.
3)If both action and search item are provided and action is in the acceptable list, then Liri calls for the appropriate channel of search.

```

function getInput (){
    
    var data =  process.argv;
    for(var i = 2 ; i < data.length ; i++) {
        newLog = newLog + " " + data[i];
    } 
    updateLog(newLog);

    if (data.length === 2 ){
        askForAction();
    } 
    else if (data.length === 3){
        action = data[2];
        if (validate (action)){
            console.log("you didn't enter a search item for the action, default would be used if applicable");

            if (action === "spotify-this-song"){
                searchName = "The+Sign";
            }
            if (action === "movie-this"){
                searchName = "Mr.+Nobody";
            }  
        } else {
            console.log ("seems that the action you asked is not among our list of acceptable actions");
            askForAction();
        }    
    } else {
        action = data[2];
        searchName = data[3];
        for(var i = 4; i < data.length ; i++){
            searchName = searchName + " " + data[i];
        }
        console.log("searchName  is     " , searchName);
    }  
    return searchName;
}


```


# Learning points
<!-- Learning points where you would write what you thought was helpful -->
- javascript
- node.js
- API calls
- promise functions
- call backs
- error handling
- moment.js
- node dotEnv
- node request
- Node Spotify API
- working with fs (file system)
- working with inquirer (.prompt)
- npm init -y
- npm install
- node modulus




# Author 
<!-- make a link to the deployed site and have your name as the link -->
Nasibeh Nourbakhshnia
(www.linkedin.com/in/nasibehnourbakhshnia)

# License
