>> NETFLIX API
page1
// list of country(Nollywood)
* http://localhost:1234/country
* https://netflixapi-7fvc.onrender.com/country


//movies with respect to country
* http://localhost:1234/items?locationId=1
* https://netflixapi-7fvc.onrender.com/items?locationId=1


//list of category
* http://localhost:1234/category
* https://netflixapi-7fvc.onrender.com/category


page2
// movies with respect to type
* http://localhost:1234/items?movieId=2
* https://netflixapi-7fvc.onrender.com/items?movieId=2


// movies with respect to category + location
* http://localhost:1234/filter/5?locationId=2
* https://netflixapi-7fvc.onrender.com/filter/5?locationId=2


page3
// details of movies selected
* http://localhost:1234/items/8
* https://netflixapi-7fvc.onrender.com/items/8


// watch selected movie
* http://localhost:1234/placeOrder
* https://netflixapi-7fvc.onrender.com/placeOrder

page5
// list of all movies watched
* http://localhost:1234/watched
* https://netflixapi-7fvc.onrender.com/watched

// update movies
*
// delete movies watched
* http://localhost:1234/deleteWached
* https://netflixapi-7fvc.onrender.com/deleteWached
{"id":11}

db.items.find({location_id:2})