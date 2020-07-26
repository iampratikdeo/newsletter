const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const port = process.env.port || 8080;

const app = express();
app.use(express.static("public"));
app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.use(bodyParser.urlencoded({extended:true}));

app.post("/", function(req,res){
  const fn = req.body.fname;
  const ln = req.body.lname;
  const mem = req.body.email;

  const data = {
    members: [
      {
        email_address: mem,
        status: "subscribed",
        merge_fields: {
          FNAME: fn,
          LNAME: ln
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us17.api.mailchimp.com/3.0/lists/7f3229630f";
  const options = {
    method: "POST",
    auth: "pratikdeo78:b2262ad377b3fffd49e74b0fc3a326e8-us17"
  };
  const requestt = https.request(url, options, function(response){

    if(response.statusCode === 200){
      res.sendFile(__dirname +"/success.html");
    } else {
      res.sendFile(__dirname +"/failure.html");
    }
    response.on("data", function(data){
      console.log(JSON.parse(data));
    });

  });

  requestt.write(jsonData);
  requestt.end();
});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(port, function(){
  console.log("Server is running on port 8080");
});


//b2262ad377b3fffd49e74b0fc3a326e8-us17

//7f3229630f
