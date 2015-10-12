var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var configDB = require('./config/database.js');
var Cafe = require('./app/models/user');
var LoginUser = require('./app/models/login');
var crypto = require('crypto');

mongoose.connect(configDB.url);

var db =mongoose.connection;

var Locations = mongoose.model('locations', Cafe);
var Test = mongoose.model('logger', LoginUser);

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());

app.get('/getloc', function (req,res){
    Locations.find(function (err, docs){
        if (err) throw err;

        console.log(docs);
        res.json(docs);
    })
});

app.post('/addCafe', function (req,res){

    console.log(req.body);
    var newCafe = Cafe({
        name: req.body.name,
        longitude: req.body.longitude,
        latitude: req.body.latitude
    });

    newCafe.save(function (err,doc){
        if(err) throw err;
    console.log('Cafe Created');
    res.json(doc);
    })
});

app.delete('/getloc/:id', function(req,res){
 var id = req.params.id;
 console.log(id);
    Cafe.remove({_id: id}, function (err, doc){
        if(err) throw err;

        console.log('Removed Cafe: ' + id);
        res.json(doc);
    });


});

app.get('/getloc/:id', function (req,res){
    var id = req.params.id;
    console.log("Trying to find " + id);
    Cafe.findOne({ _id: id}, function (err,doc){
        if(err) throw err;
        else
        {
            console.log("found " + doc);
            res.json(doc);
        }
    

    });
});

app.put('/getloc/:id', function (req,res){
    var id = req.params.id;
    var query = { _id: id};
    Cafe.findOneAndUpdate(query,
        { $set: {name: req.body.name, longitude: req.body.longitude, latitude: req.body.latitude}},
         function (err, doc){
        if(err) throw err;
         console.log(req.body.name);
        res.json(doc);
    });
});

app.put('/auth', function (req,res){

var newlog = LoginUser({
    username: req.body.username,
    password: req.body.password
 });
var md5 = crypto.createHash('md5');
 newlog.password = md5.update(newlog.password).digest('hex');
 console.log(newlog.password);

Test.findOne(
    {username: newlog.username , password: newlog.password},
    function (err, docs){
        if (err) throw err;

        console.log(docs);
        res.sendFile(__dirname + '/public/Locations.html');
    })


});

app.get('/Locations', function (req, res)
{
    res.render(__dirname + '/public/Locations');
});
app.listen(port);
console.log('Server running on port: ' + port);

/*
   console.log(req.body);
    
 

 

*/