const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('./api/config/development');
// const cors = require('cors');
const app = express();

mongoose.connect(config.mongoose.mongo_url, {useNewUrlParser: true});

const userRoute = require('./api/Routes/user');
const dashboardRoute = require('./api/Routes/dashboard');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
// app.use(cors());

app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
        return res.status(200).json({});
    }
    next();
})
 
app.use('/google-auth', userRoute);
app.use('/dashboard', dashboardRoute);

app.use((req, res, next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((err, req, res, next)=>{
    res.status(err.status || 500);
    res.json({
        error:{
            message: err.message
        }
    })
});

module.exports = app;