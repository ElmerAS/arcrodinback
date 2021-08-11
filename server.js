const express = require ('express');
const app = express();
const cors = require("cors");
var bodyParser = require('body-parser');
var corsOptions = {
    //origin: "http://localhost:8081",
    origin: "https://arcrodinapp.herokuapp.com/",
  };
app.use(cors(corsOptions));
app.use(bodyParser.json());

const dbConfig = require('./app/config/mongodb.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Successfully connected to MongoDB');
    }).catch((err) => {
        console.log('Failed to connect to MongoDB');
        process.exit();
    })

require('./app/routes/usuario.router')(app);
require('./app/routes/cliente.router')(app);
require('./app/routes/proforma.router')(app);
require('./app/routes/contacto.router')(app);

const server = app.listen(process.env.PORT || 8000, function () {
    //let host = server.address().address
    //let port = server.address().port

    console.log('Server listening...');
})
