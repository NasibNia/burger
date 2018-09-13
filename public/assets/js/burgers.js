$(function(){

    //submitting a new burger:
    $(".create-form").on('submit' , function(event){
        event.preventDefault();

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


    $(".change-stat").on("click", function(event){
        event.preventDefault();

        var newStat = $(this).attr('data-newStat');
        var name = $(this).parent().burger_name;
        var id = $(this).attr('data-id');
        var burgerToUpdate = {
            burger_name : name,
            devoured    :newStat
        };

        $.ajax("/api/burgers/"+id, {
            type : "PUT",
            data : burgerToUpdate
        }           
        ).then(function(results){
            console.log("information posted to the server");
            location.reloadd();
        });
    });
    


});

