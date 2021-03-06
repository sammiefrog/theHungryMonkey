//global variable
var resultSection = $('#results');


function getRecipes() {
    var userInput = $('#inputField').val();
    resultSection.empty();

    if (userInput !== "") {

        var queryURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + userInput;

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // We store all of the retrieved data inside of an object called "recipeData"
            .then(function (recipeData) {
                if (recipeData.meals === null) {
                    resultSection.html('<div class="ui massive negative message">' +
                        '<i class="close icon"></i>' +
                        '<div class="header">' +
                        'There\'s no recipes for that entry!' +
                        '</div>' +
                        '<p>Please try again' +
                        '</p></div>');

                    $('.close').on('click', function () {
                        resultSection.empty();
                    });

                    return;
                }
                else {
                    for (var j = 0; j < recipeData.meals.length; j++) {
                        //Not showing recipe cards if no link is present
                        if (recipeData.meals[j].strYoutube !== ""){

                        var recipeCard = $('<div class ="ui card">');

                        var imgDiv = $('<div class="image">');
                        $('<img src=' + recipeData.meals[j].strMealThumb + '>').appendTo(imgDiv);
                        imgDiv.appendTo(recipeCard);

                        var cardBody = $('<div class ="content">')
                        $('<h4>').text(recipeData.meals[j].strMeal).appendTo(cardBody);
                        $('<h4>').text(recipeData.meals[j].strArea).appendTo(cardBody);

                        

                        $('<a class="link" href="' + recipeData.meals[j].strYoutube + '">').text(recipeData.meals[j].strYoutube).appendTo(cardBody);

                        cardBody.appendTo(recipeCard);
                        recipeCard.appendTo(resultSection);

                        }
                    }
                }
            });
    }

}


function yelpCall() {

    var queryTerm = $("#inputField").val().trim();

    resultSection.empty();

    if (queryTerm !== "") {

        var yelpURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=nashville&categories=restaurants&term=" + queryTerm;

        // Pulls response from the Yelp api
        $.ajax({
            url: yelpURL,
            method: "GET",
            headers: {
                "Authorization": "Bearer FX7G_LW66z7oBdEKO1pNijgUXQbOknj073l6OGxkmIZ1XWT7J2isalDcZmqv0UC0CM0yj3Mgqkqs-STQDSeOtL-C_RWLhzMbFdV1xdFV5RCmWXPWZz81cMkThT1tXnYx",
            }
        })

            .then(function (response) {
            //    If an entry has no restaurants, it will create a message
                if (response.businesses.length === 0) {
                    resultSection.html('<div class="ui massive negative message">' +
                        '<i class="close icon"></i>' +
                        '<div class="header">' +
                        'There\'s no restaurants for that entry!' +
                        '</div>' +
                        '<p>Please try again' +
                        '</p></div>');

                    $('.close').on('click', function () {
                        resultSection.empty();
                    });

                    return;
                }
                // Creates cards if there are restaurants for that entry
                else {
                    for (var i = 0; i < response.businesses.length; i++) {
                        var card = $("<div class='ui card'>");

                        var content = $("<div class='content'>");
                        var header = $("<div class='header'>");
                        $("<h4>").text(response.businesses[i].name).appendTo(header);

                        var description = $("<div class='description'>");
                        $("<p>").text(response.businesses[i].display_phone).appendTo(description);
                        $("<p>").text(response.businesses[i].location.display_address[0]).appendTo(description);
                        $("<p>").text(response.businesses[i].location.display_address[1]).appendTo(description);

                        // Conditional that controls what prints based on the image
                        if (response.businesses[i].image_url !== "") {

                            var imageLink = $("<a class='image'>");
                            imageLink.attr("href", response.businesses[i].url);

                            var image = $("<img />").appendTo(imageLink);
                            image.attr("src", response.businesses[i].image_url);
                            image.height("250px");

                            content.append(header, description);
                            card.append(imageLink, content);
                            resultSection.append(card);

                        }

                    }
                }
            })
    }
}


$(document).ready(function () {
    // Button click to show recipes
    $('#recipeBtn').on('click', function (e) {
        e.preventDefault();
        getRecipes();
    })
    
    // Button click to show restaurants
    $("#restaurantBtn").on("click", function (e) {
        e.preventDefault();
        yelpCall();
    })

    //dont delete this dummy
});

