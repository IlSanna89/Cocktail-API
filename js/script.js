$(document).ready(function() {

    
    $("#search-btn").click(function() {
        var cocktail = $("#search").val();
        $("#search").val("");
        $("#list-cocktail").empty();
        getData(cocktail);
    });

    $("#search").keyup(function(invio) {
        if(invio.which == 13) {
            var cocktail = $("#search").val();
            $("#search").val("");
            $("#list-cocktail").empty();
            getData(cocktail);
        }    
    });

    $("#list-cocktail").on("click", ".dettagli",
    function() {
        $(this).next().fadeIn();
    });

    $("#list-cocktail").on("click", ".exit",
    function() {
        $(this).parent().fadeOut();
    });

});

function searchCocktails(result) {
    
    var source = $("#result-template").html();
    var template = Handlebars.compile(source);
    
    for(var i = 0; i < result.length; i++) {

        var context = { 
            "id": result[i].idDrink,
            "name": result[i].strDrink,
            "glass": result[i].strGlass,
            "category": result[i].strCategory,
            "alchoolic": result[i].strAlcoholic,
            "ingredient1": result[i].strIngredient1,
            "ingredient2": result[i].strIngredient2,
            "ingredient3": result[i].strIngredient3,
            "ingredient4": result[i].strIngredient4,
            "ingredient5": result[i].strIngredient5,
            "ingredient6": result[i].strIngredient6,
            "instructons": result[i].strInstructionsIT,
            "image": result[i].strDrinkThumb
        };
        var html = template(context);

        $("#list-cocktail").append(html);
    }
}

function getData(cocktail) {
    $.ajax(
        {
            "url": "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + cocktail,
            "method": "GET",
            "success": function(data) {
                var result = data.drinks;
                if(result <= 0) {
                    notFound()
                }else {
                    searchCocktails(result);
                }
            },
            "error": function(err) {
                alert("Errore!");
            }
        }
    );
}

function notFound() {
    
    var source = $("#not-found-template").html();
    var template = Handlebars.compile(source);
    
    var html = template(source);
    $("#list-cocktail").append(html);
}


