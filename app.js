const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  
   const query = req.body.cityName;
const apiKey="e5294642960b3f40a562653df946fcb8";
const units = "imperial";
const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey +"&zip=" + query +"&units=" +units ;  
https.get(url, function(response){
console.log(response.statusCode);

response.on("data", function(data){
const weatherData = JSON.parse(data);
const temp = weatherData.main.temp;
const feels = weatherData.main.feels_like;
const desc = weatherData.weather[0].description;
const wind= weatherData.wind.speed;
const icon = weatherData.weather[0].icon;
const imageURL= "http://openweathermap.org/img/wn/" + icon + "@2x.png";

res.write("<h1>The actual temp for" + query + "</h1>");
res.write("<h1>"+ temp + " degrees</h1>")
res.write("<img src=" + imageURL +">");
res.send();
});
});
});


app.listen(3000,function(){console.log("Server is running on port 3000");})





