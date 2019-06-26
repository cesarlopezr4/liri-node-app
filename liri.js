// Liri application that allows to find information related this music (song, concerts) 
// and movies as well, it has the option to chose a song  using a text file ( random.txt)
// It use Node services and the Json Libraries, axios & fs.

require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require('moment');
var fs = require("fs");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var whatToDo = process.argv[2];
// var userInput = process.argv[3];

// Joining the remaining arguments since an actor or tv show name may contain spaces
var userInput = process.argv.slice(3).join(" ");

// using the command line through Node services we use the Liri.js and input the corresponding arguments or parameters

switch (whatToDo) {
    case "spotify-this-song":
        spotifyThis(userInput)
        // var userInput = process.argv.slice(3).join(" ")
        break;

    case "concert-this":
        concertThis(userInput)
        // var userInput = process.argv.slice(3).join(" ")
        break;

    case "movie-this":
        movieThis(userInput)
        // var userInput = process.argv.slice(3).join(" ")
        break;

    case "do-what-it-says":
        doWhatItSays(userInput)
        break;
}

// spotify API services
function spotifyThis(songName) {

    spotify.search({ type: 'track', query: songName, limit: 3 })
        .then(function (response) {


            // Place the response.data into a variable, jsonData.
            //   var jsonData = response.tracks.items[0].album;
            //   console.log(jsonData);
            console.log(JSON.stringify(response.tracks.items[0].album.name, null, 2));
            console.log(JSON.stringify(response.tracks.items[0].album.artists[0].name, null, 2));
            console.log(JSON.stringify(response.tracks.items[0].name, null, 2));
            console.log(JSON.stringify(response.tracks.items[0].preview_url, null, 2));
            // console.log(JSON.stringify(response.tracks.items[0].album, null, 2));

        })
        .catch(function (err) {
            console.log(err);
        })
}

// Band inTown API services 

function concertThis(artist) {
    console.log(artist);

    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function (response) {

            console.log(response.data);
            
        }).catch(function(error){

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
                
            }
            console.log(error.config);
        })
       

}

// input serach arguments using a text file - random.txt
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        
        var newData = data.split(",");
        console.log(newData);
        console.log(newData[0]);
        console.log(newData[1]);
        
              
        // If there was an error reading the file, we log it and return immediately
        if (err) {
            return console.log(err);
        }
               
        songName = newData[1]
          

            spotify.search({ type: 'track', query: songName, limit: 3 })
            .then(function (response) {
    
    
                // Place the response.data into a variable, jsonData.
                //   var jsonData = response.tracks.items[0].album;
                //   console.log(jsonData);
                console.log(JSON.stringify(response.tracks.items[0].album.name, null, 2));
                console.log(JSON.stringify(response.tracks.items[0].album.artists[0].name, null, 2));
                console.log(JSON.stringify(response.tracks.items[0].name, null, 2));
                console.log(JSON.stringify(response.tracks.items[0].preview_url, null, 2));
                // console.log(JSON.stringify(response.tracks.items[0].album, null, 2));
    
            })
            .catch(function (err) {
                console.log(err);
            })

       
    })

}



function movieThis(movieName) {
    // var movieName = whattoDo
    axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log(JSON.stringify(response.data, null, 2));
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


