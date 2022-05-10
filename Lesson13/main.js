const MongoDB = require('mongodb').MongoClient
const dbURL = "mongodb://localhost:27017"
const dbName = "recipe_db";

MongoDB.connect(dbURL, (error, client) => {
    if (error) throw error
    let db = client.db(dbName)
    db.collection('contacts').find().toArray((error, data) => {
        if (error) throw error
        console.log(data)
    })

    db.collection("contacts").insert({
        name: "Long",
        email: "Long@hihi.com"
    }, (error, db) => {
        if (error) throw error;
        console.log(db);
    });
})


