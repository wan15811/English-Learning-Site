require('./config/config');
require('./models/db');
require('./config/passportConfig');

const express = require('express');
const bodyParser = require('body-parser'); //upload file
const cors = require('cors');
const passport = require('passport');
var ejs = require('ejs');
// var routes = express.Router();
const rtsIndex = require('./routes/index.router');

var lessonController = require('./controllers/lesson.controller');
var vocabularyController = require('./controllers/vocabulary.controller');
var app =  express();

// middleware
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200'}));
app.use(passport.initialize());
app.use('/api', rtsIndex);
app.set("view engine","ejs");
app.set("views","./views");
app.use(express.static("public"));
// app.use(app.router);
// routes.initialize(app);
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

//vocabulary
app.use('/vocabulary',vocabularyController);