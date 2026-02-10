const express = require('express');
const app = express();

app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

const dashboard = require("./routes/dashboard");
const about = require("./routes/about");

app.use("/", dashboard);
app.use("/about", about);

module.exports = app;