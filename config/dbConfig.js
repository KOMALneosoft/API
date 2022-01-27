const database = "mongodb://localhost:27017/Employee";
const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        await mongoose.connect(database, { useNewUrlParser: true });
        console.log("MongoDB connected")
    }
    catch (err) {
        console.log(err.message)
    }
}
module.exports = connectDB;