const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

const userRoute = require('./api/Routes/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));

app.get('/',(req, res)=>{
    res.send("hello");
})

app.use('/google-auth', userRoute);

module.exports = app;