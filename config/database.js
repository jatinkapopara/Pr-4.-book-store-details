const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/crud');

const db = mongoose.connection;

db.on('connecty', (err) => {
    if (err) {
        console.log("db is not started");
        return false;
    }
    console.log("db is stared on mongodb");
})

module.exports = db;