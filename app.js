"use strict"

const express = require('express');
const bodyParser = require('body-parser');

const https = require('https');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  
    const city = req.body.cityName;
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&units=metric&appid=cd0a53a13939ee80096a1b34216ea1f8&lang=en";
    
    https.get(url, function(response){
       
        response.on("data", function(data){

            const weatherData = JSON.parse(data);

            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const weather = weatherData.weather[0].main;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon +"@2x.png";

            res.setHeader("Content-Type", "text/html");   //to use image as first write 

            res.write("<br><h1 style=\"text-align:center; font-family: monospace, Courier;\">The Temperature in " +  city.toUpperCase() + " is : " + temp + "* C</h1><br><hr>");
            res.write("<img style=\"display:block; margin-left:auto; margin-right:auto; width:15%;\" src=" + imageUrl + ">");
            res.write("<h3 style=\"text-align:center; font-family: monospace, Courier;\">" + weather + "</h3>");
            
            res.send();    
        });
    });
});

app.listen(3000, function(){

   console.log("Server is running on port 3000");
});