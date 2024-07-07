const mongoose = require('mongoose');
const mongooseURI = "mongodb://localhost:27017/inotebook"


async function connectToMongo() {
    try {
        await mongoose.connect(mongooseURI);

        console.log("Connected Successfully !");

    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        process.exit(1);
    }
}

module.exports = connectToMongo;