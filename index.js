const express = require('express');
const mongoose = require('mongoose');
const PORT = 8000;

const router = require('./routes/routes')
const connectDB = require('./config/dbConfig');
const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use('/api', router)
connectDB();


app.listen(PORT, (err) => {
    if (err)
        throw err;
    console.log(`Working on Port ${PORT}`);
});



