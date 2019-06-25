require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require('moment');
var fs = require("fs");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var whatToDo = process.argv[2];
var userInput = process.argv[3];

switch (whatToDo) {
    case "spotify-this-song":
        spotifyThis()
        break;

    case "concert-this":
        concertThis()
        break;

    case "movie-this":
        movieThis()
        break;

    case "do-what-it-says":
        doWhatItSays()
        break;
}

function spotifyThis(song)
spotify
    .search({ type: 'track', query: song, limit: 1 })
    .then(function (response) {
        console.log(JSON.stringify(response, tracks.items[0].name, null, 2));
    })
    .catch(function (err) {
        console.log(err);
    })


function concertThis() {

    axios.get("https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp").then(
        function (response) {

            console.log(response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        })

    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
    }
    else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        console.log(error.config);
    }

}


function doWwhatItSays() {
    var number = 0;
    fs.readFile("random.txt", "utf8", function (err, data) {
        // If there was an error reading the file, we log it and return immediately
        if (err) {
            return console.log(err);
        }

        spotify
            //   query.song = data;
            .search({ type: 'track', query: data, limit: 1 })
            .then(function (response) {
                console.log(JSON.stringify(response, tracks.items[0].name, null, 2));
            })
            .catch(function (err) {
                console.log(err);

            })
    })
}
function movieThis() {
            var movieName = whattoDo
            axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy").then(
                function (response) {
                    console.log("The movie's rating is: " + response.data.imdbRating);
                })
                .catch(function (error) {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log("---------------Data---------------");
                        console.log(error.response.data);
                        console.log("---------------Status---------------");
                        console.log(error.response.status);
                        console.log("---------------Status---------------");
                        console.log(error.response.headers);
                    } 
                    else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an object that comes back with details pertaining to the error that occurred.
                        console.log(error.request);
                    } 
                         else {
                        // Something happened in setting up the request that triggered an Error
                        console.log("Error", error.message);
                        console.log(error.config);
                              }   
                })
                           
            }


