require("dotenv").config('./.env');
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const connectDB = require("../db/db");

const app = express();
connectDB();

const todoRouter = require('../routes/route');

const PORT = process.env.PORT || 5000;
app.use(cors(
    {
        origin: "*",
        credentials: true,
    }
));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use('/api/todo', todoRouter);


app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));