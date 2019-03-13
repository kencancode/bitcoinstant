const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var cryptoSelected;
var fiatSelected;
var priceSelected;

app.use(express.static('public'))   //Florence

app.get("/", function(req, res){
  res.render("homepage")
});

app.post("/", function(req, res){
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;

  cryptoSelected = crypto;
  fiatSelected = fiat;


  var rootURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
  var finalURL = rootURL + crypto + fiat;

  request(finalURL, function(error, response, body){
    //parse it first from JSON to object, then access it.
    var data = JSON.parse(body);
    var price = data.last

    priceSelected = price;
  });

  res.redirect("/result");
});


app.get("/result", function(req, res){
  const templateVars = { crypto: cryptoSelected, fiat: fiatSelected, price: priceSelected }
  res.render("result", templateVars)
});


app.listen(8080, function(){
  console.log("Server is running on port 8080.");
});

