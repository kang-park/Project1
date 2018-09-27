//test
console.log('hello');

let food = [];
//zomato api bffe3bea078cbc9eee86b514973b129e
$(document).ready(function(){

/*add this to your html -> <script src="https://storage.googleapis.com/code-snippets/rapidapi.min.js"></script> */
var rapid = new RapidAPI("default-application_5b85e35fe4b02d6cfa69e89b", "39d8805b-7d44-474d-92c4-b6d5a8def142");
$("#search").on('click', function(){
rapid.call('Zomato', 'search', { 
	'apiKey': 'bffe3bea078cbc9eee86b514973b129e',
	'coordinates': '30.26875275473545, -97.7448378504939',
	'count': '50',
	'radiusSearch': '1500',
	'entityId': '0',
	'searchQuery': $("#input").val(),
	'order': 'desc',
	'sort': 'rating'

}).on('success', function (payload) {
   /*YOUR CODE GOES HERE*/ 

   //empty list when new search 
   $("#card_list").empty();
   food = payload.result.restaurants;

   //provide cards for each result
   for(i=0; i< food.length; i++){

     //test
  console.log(payload.result.restaurants[i]);

  //target restaurant name
  let name = food[i].restaurant.name;
  //test
  console.log(name + ' name');
  //target restaurant address
  let address = food[i].restaurant.location.address;
  //test
  console.log(address + ' address');
   //target restaurant price
  let priceRange = food[i].restaurant.price_range;
  //test
  console.log(priceRange + ' price_range');
 //target restaurant rating
  let rating = food[i].restaurant.user_rating.aggregate_rating;
  //test
  console.log(rating +' rating');
 //target restaurant image
  let image = food[i].restaurant.featured_image;
  //test
  console.log(image +' image');
  //target latitude
  let latitude = parseFloat(food[i].restaurant.location.latitude);
  //target longitude
  let longitude = parseFloat(food[i].restaurant.location.longitude);

  //card for the food result
  //provide card with class equal to price range for filter targeting
  let foodDiv = $("<div class='card font-weight-bold col-sm-3 m-3 "+priceRange+"'>");
  console.log(foodDiv);
  //create image for card
  let imageDiv = $("<div class='card-image waves-effect waves-block waves-light'> <img class='activator' src='"+image+"'></div>");
  //create content div
  let contentDiv = $("<div class='card-content'> <span class='card-title font-weight-bold activator grey-text text-darken-4'>"+ name +"<i class='material-icons text-light bg-primary p-1 rounded right'>more</i></span></div>");
  //creating div to hold more content pop-up
  let moreContent = $("<div class='card-reveal'>");
  //create element for content
  //display name on the card
  let pName = $("<p class='details' data-name='"+ name +"'>").text(name);
  //display rating on the card
  let pRating = $("<p class='details' data-rating='"+ rating +"'>").text("Rating: " + rating);
  //display price on the card
  let pPrice = $("<p class='details' data-price='"+ priceRange +"'>").text("Price Range: " + priceRange);
  //display address on the card
  let pAddress = $("<p class='details' data-address='"+ address +"'>").text(address);

  //append content to card
  foodDiv.append(imageDiv)
  foodDiv.append(contentDiv)
  foodDiv.append(moreContent);
  moreContent.append(pName, pRating, pPrice, pAddress);
  //populate cards in the card list div
  $("#card_list").prepend(foodDiv);

  //add data attribute to the card equal to the restaurant's rating
  foodDiv.attr("data", priceRange);
  //test
  console.log($(".card").attr("data") + ' ayn');
  
// Initialize and add the map
function initMap() {
  // The location of target
  var target = {lat: latitude, lng: longitude};
  // The map, centered at target
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 15, center: target});
  // The marker, positioned at targer
  var marker = new google.maps.Marker({position: target, map: map});
}


//test
console.log($(".card")[0].attributes[1].value);
};
//filter by price range
$(".filter").on('click', function(){
  $(".card").hide();
  
  $("#one").on('click', function(){
    $(".1").show('slow');
    $(".2").show('slow');
   });
  
   $("#two").on('click', function(){
    $(".3").show('slow');
    $(".4").show('slow');
   });
  
   $("#three").on('click', function(){
    $(".4").show('slow');
    $(".5").show('slow');
   });
   
})



//when a card is double clicked
$(".card").dblclick(function() {
  //grab info and image from card
  let dataName = $($(this)[0].children[2].children[0]).clone();
  let dataAddress = $($(this)[0].children[2].children[3]).clone();
  let dataPrice = $($(this)[0].children[2].children[2]).clone();
  let dataRating = $($(this)[0].children[2].children[1]).clone();
  let dataImg = $($(this)[0].children[0].children[0]).clone();

  //hide all the cards
  $('.card').hide('slow');
  //prepend pop-up to card_list div
  $('#card_list').prepend("<div class='pop-up p-5 rounded'></div>");
  //prepend X in pop-up info
  $(".pop-up").prepend("<button class='exit btn-dark'>X</button>")

  //append image and info to pop-up
  $('.pop-up').append(dataImg);
  $('.pop-up').append(dataName);
  $('.pop-up').append(dataPrice);
  $('.pop-up').append(dataRating);
  $('.pop-up').append(dataAddress);
  $('.pop-up').append("<div class='m-2 rounded' id='map'></div>");
  //give image a rounded adge and make it center
  $(".activator").addClass('rounded mx-auto d-block');

  
 
  initMap();

//when x is clicked
$(".exit").on('click', function(){
  //show cards
  $('.card').show('slow');
  //remove pop-up screen
  $(".pop-up").remove();
})

})


}).on('error', function (payload) {
	 /*YOUR CODE GOES HERE*/ 
});



});

})