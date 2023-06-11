const mongoose = require("mongoose");
require('dotenv').config();

const mongoURI = process.env.MONGO_URL


const connectToMongo=()=>{
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected")
    }) 
}

module.exports = connectToMongo;