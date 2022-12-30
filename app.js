const express = require("express");
const https = require("https");

const app = express();


app.get("/", function(req, res){
 const url = "https://api.openweathermap.org/data/2.5/weather?appid=e5294642960b3f40a562653df946fcb8&zip=44053&units=imperial"   
https.get(url, function(response){
console.log(response.statusCode);

response.on("data", function(data){
  const weatherData = JSON.parse(data);
  const temp = weatherData.main.temp;
  const feels = weatherData.main.feels_like;
  const desc = weatherData.weather[0].description;
  const wind= weatherData.wind.speed;
  const icon = weatherData.weather[0].icon;
  const imageURL= "http://openweathermap.org/img/wn/04d@2x.png";

  console.log("The actual temp is " + (temp)+ " but it feels like " + feels);
  res.write("<h1>The actual temp is " + temp + " degrees </h1>");
  res.write("<img src=" +imageURL +">");
  res.write("<p>The wind speed is " + wind + " mph</p>");
  res.send()
    
})
})

 
})




app.listen(3000,function(){console.log("Server is running on port 3000");})