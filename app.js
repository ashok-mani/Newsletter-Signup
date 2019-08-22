//jshint esversion:6

const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/", function(req, res){
  var fname = req.body.firstName;
  var lname = req.body.lastName;
  var email = req.body.emailId;
  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fname,
          LNAME: lname
      }
      }
    ]
  };
  var jsonData = JSON.stringify(data);
  console.log(jsonData);
  var options = {
    url: "https://us3.api.mailchimp.com/3.0/lists/e3173d3232",
    method: "POST",
    headers: {
      "Authorization" : "AshokM 43d47562a50f4f316fe2b9654e3135ba-us3"
    },
    body: jsonData
  };
  request(options, function(error, response, body){
    if(error){
      console.log(error);
      res.sendFile(__dirname+"/failure.html");
    } else {
      if(response.statusCode === 200) {

        res.sendFile(__dirname+"/success.html");
      } else {
        res.sendFile(__dirname+"/failure.html");
      }

    }
    console.log(response.statusCode);
  });
});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Port 3000 started");
});


// 43d47562a50f4f316fe2b9654e3135ba-us3
// e3173d3232
