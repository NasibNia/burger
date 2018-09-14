$(function(){

    // $('#all-burgers-div').hide();
    // $('#showAllBurgers').on("click", function(event){
    //     $('#all-burgers-div').show();
    // });
    // $(document).on('click', '.change-stat' , function(event){
    //     event.preventDefault();
    //     console.log("the name of this button is : " + $(this).attr('data-id'));
    //     console.log("the name of this button is : " + $(this).attr('data-newStat'));
    //     console.log("the name of this button is : " + $(this).attr('data-name'));

    // });

    // $('#burger_gif').hide();

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


    $(document).on('click', '.change-stat' , function(event){
        event.preventDefault();

        // console.log("the name of this button is : " + $(this).attr('data-newStat'));

        console.log("this is  " , this)
        var newStat = $(this).attr('data-newStat');
        var id = $(this).attr('data-id');
        var burgerToUpdate = {
            devoured    :newStat
        };

        $.ajax("/api/burgers/"+id, {
            type : "PUT",
            data : burgerToUpdate
        }           
        ).then(function(results){
            console.log("information posted to the server");
            location.reload();
        });
    });
    


});

