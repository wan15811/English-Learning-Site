require('./config/config');
require('./models/db');
require('./config/passportConfig');
// require('./config/passportAdminConfig');
const express = require('express');
const bodyParser = require('body-parser'); //upload file
const cors = require('cors');
const passport = require('passport');
var ejs = require('ejs');
const rtsIndex = require('./routes/index.router');


//controller
var lessonController = require('./controllers/lesson.controller');
var vocabularyController = require('./controllers/vocabulary.controller');
var vocabcateController = require('../server/controllers/vocabcate.controller');
var grammarCateController = require('../server/controllers/grammarcate.controller');
var adminController = require('../server/controllers/admin.controller');
var app =  express();

// middleware
//use body parser for grabbing information from POST requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({ origin: 'https://0.0.0.0:4200'}));
app.use(passport.initialize());
app.use('/api', rtsIndex);
app.set("view engine","ejs");
app.set("views","./views");
app.use(express.static("public"));

// Errors handler
    app.use((err, req, res, next) => {
        if(err.name === 'ValidationError') {
            var valError = [];
            Object.keys(err.errors).forEach(key => valError.push(err.errors[key].message));
            res.status(422).send(valError)
        }
    })
//start server
app.listen(process.env.PORT, () => console.log(`Server started at port: ${process.env.PORT}`));

app.use('/lesson', lessonController);

//vocab cates
app.use('/vocabcate', vocabcateController);

//vocabulary
app.use('/vocabulary',vocabularyController);

//grammar cates
app.use('/grammarcate',grammarCateController);

//admin
// app.use('/admin',adminController);