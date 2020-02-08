const express = require('express');
const cors = require('cors');
const app = express();
const BodyParser = require('body-parser');
const MongoDb = require('mongodb');

const MongoClient = MongoDb.MongoClient;
const URL = "mongodb://localhost:/27017";

app.use(cors());
app.use(BodyParser.json());

app.post('/Keepnotes', (req, res) =>{

    MongoClient.connect(URL, (err, client) => {
        if (err) throw err;
        var db = client.db("Task");
        
        db.collection("KeepNotes").insertOne(req.body, function(err, result){
            if (err) throw err;
            console.log(result);
            res.status(200).json({Message: "Success"});
            return
        });

        client.close()
    });
});

app.get('/Details', (req, res) => {
    MongoClient.connect(URL, (err, client) => {
        if (err) throw err;
    
        var db = client.db("Task");

        var cursor = db.collection("KeepNotes").find().toArray();

        cursor.then((data) => {
            res.json(data);
        })

        client.close();
    })
})

app.post("/Keepnotes2", function (req, res) {

    MongoClient.connect(URL, (err, client) => {
        if (err) throw err;
        var db =  client.db("Task");

        var myquery = {id:req.body.id};
        console.log(myquery)
        var newvalues = {$set:{id:req.body.id, ListName:req.body.ListName, user:req.body.user, Date:req.body.Date}};
        
        db.collection("KeepNotes").updateOne(myquery,newvalues , function(err,result) {
            if (err) throw err;
            console.log("1 document updated");
            res.status(200).json({Message:"Success"})
        });

        client.close();
    });
});

app.post('/delete', (req, res) =>{

    MongoClient.connect(URL, (err, client) => {
        if (err) throw err;
        var db = client.db("Task");
        
        db.collection("KeepNotes").deleteOne({ id:req.body.id}, function(err, result){
            if (err) throw err;
            console.log("One document deleted")
            res.status(200).json({Message:"Success"})
        })

        client.close()
    });
});

app.post('/deleteall', (req, res) =>{

    MongoClient.connect(URL, (err, client) => {
        if (err) throw err;
        var db = client.db("Task");
        
        db.collection("KeepNotes").deleteMany({}, function(err, result){
            if (err) throw err;
            console.log("Deleted All")
            res.status(200).json({Message:"Success"})
        })

        client.close()
    });
});
app.listen(6060);