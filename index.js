

const express = require("express");
const path = require('path')

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors')
require('dotenv').config();
const dbConnectionString = process.env.DB_CONNECTION_STRING;
const sessionSecret = process.env.SESSION_SECRET;
const app = express();
const route = require("./routes/route");
const multer = require("multer");
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable if you need to send cookies with the request
}));

app.use(express.static(path.join(__dirname, 'uploads')));
console.log("this is the file ", path.join(__dirname, 'uploads'));
app.use("/", route);
mongoose.connect(dbConnectionString, {
    useUnifiedTopology: true,
})
    .then((result) => console.log("MongoDb is connected / SS_SYSTEM database"))
    .catch((err) => console.log(err));
app.listen(`${process.env.PORT || PORT}`, function () {
    console.log(`Express app running on port ${process.env.PORT || PORT} `);
});
