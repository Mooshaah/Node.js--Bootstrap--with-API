const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("http");

app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function (req,res){
   res.sendFile(__dirname+"/signup.html");

});

app.post("/", function(req, res){

    var firstName = req.body.First_name;
    var lastName = req.body.Last_name;
    var email = req.body.Email;
    var data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName

                }
            }
        ]
    };

    var jsonData= JSON.stringify(data);
    const url = "http://us17.api.mailchimp.com/3.0/lists/2070fcec6a"
    const options = {
        method:"POST",
        auth: "mohamed:767db97338cc7f23b4f4b1f184cb6359-us17"
    }
    var DATA= "";
    const request = https.request(url,options, function(response){

        if (response.statusCode === 200){
            res.sendFile(__dirname+ "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data",function (chunk){
            DATA += chunk.toString();
        }).on("end", function (){
            console.log(JSON.parse(DATA))
        })
    });
    request.write(jsonData);

    request.end();
    // console.log(firstName,lastName,email);
});

app.post("/failure", function (req, res){
    res.redirect("/")
});

app.listen(process.env.PORT || 3000, function (){
    console.log("Server Started on Port 3000")
});
