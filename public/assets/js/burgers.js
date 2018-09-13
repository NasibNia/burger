$(function(){

    //submitting a new burger:
    $("#addNewBurg").on('click' , function(event){
        var newBurger = {
            burger_name : $('#burger_name').val().trim(),
            devoured    : $('[name=divoured]:checked').val().trim()
        };
        $.ajax("/api/burgers/",
            {
            type :"POST",
            data : newBurger
        }).then(function(result){
            console.log("posted");
            location.reload();
        });   
    });

    


});

