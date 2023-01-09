// mongodb+srv://jeryllima:MOQq603DOg0s95Fc@cluster0.zmiiogz.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://jeryllima:<password>@cluster0.zmiiogz.mongodb.net/?retryWrites=true&w=majority

const express = require('express');
const MongoClient = require('mongodb').MongoClient;

// The MongoClient is like the command line Mongo client or the one in compass
// except this time round it's embedded in our Express

// read in the key/value pairs in the .env file
// and made them available via `process.env`

require('dotenv').config();

const app = express();

// function to connect to MongoDB
// first parameter -- the connection string (aka Mongo URI)
// second parameter -- the name of the database
// returns a Mongo database reference
async function connect(uri, dbname) {
    let client = await MongoClient.connect(uri, {
        useUnifiedTopology: true
    })
    const db = client.db(dbname);
    return db
}


async function main() {
    const db = await connect(process.env.MONGO_URI, "sample_airbnb")


// FOR DEMONSTRATION WITH THE SAMPLE_AIRBNB database
app.get('/', async function (req, res) {
    // eqv: db.collection('listings_and_reviews').find().limit(10);
    const listings = await db.collection("listingsAndReviews").find().limit(10).toArray();
    // if we use res.send and the first parameter is a JavaScript object or array, Express will automatically send back JSON
    res.status(200); // indicate later when we send, we want the status code to be 200
    res.send(listings);  // a normal res.send or res.render by default is status code 200
})
}
// app.get('/', function(req,res){
//     res.send("Hello World")
// })

main()

app.listen(3000, function () {
    console.log("app started")
})

