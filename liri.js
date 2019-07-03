axios = require("axios");
Spotify=require("node-spotify-api")
require("dotenv").config();
moment = require('moment');

keys = require("./keys.js");

command=process.argv[2];

if (command=="movie"){
    
       movie=process.argv[3]
       axios.get("http://www.omdbapi.com/?t="+movie+"&y=&plot=short&apikey=trilogy").then(
        function(response) {
        console.log("movie title: "+response.data.Title);
        console.log("year of release: "+response.data.Year);
        console.log("IMDB rating: "+response.data.Ratings[0].Value);
        console.log("Rotten Tomatoes: "+response.data.Ratings[1].Value);
        console.log("Country: "+response.data.Country);
        console.log("Language: "+response.data.Language);
        console.log("Plot: "+response.data.Plot);
        console.log("Actors: "+response.data.Actors);
        
})
}
if (command=="concert"){
    artist=process.argv[3]
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function(response) {
            console.log(response.data);
            list=response.data;
            
            for(i=0;i<list.length;i++){
            eventNumber=i+1
            console.log("event "+eventNumber+": ")
            console.log("name of the venue: "+response.data[i].venue.name);
            console.log("venue location: "+response.data[i].venue.country+", "+response.data[i].venue.city);
            date=response.data[i].datetime.replace("T"," ");
            formattedDate=moment(date).format("MM/DD/YYYY");
            console.log("date: "+formattedDate);
            }
        })
}


if(command=="spotify"){
    song=process.argv[3]
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      
      console.log("Artist's Name: "+data.tracks.items[0].artists[0].name); 
      console.log("Album: "+data.tracks.items[0].album.name); 
      console.log("Preview url: "+data.tracks.items[0].preview_url) 
      });
}

