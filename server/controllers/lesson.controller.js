const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Lesson } = require('../models/lesson.model');
 
// => localhost:8080/lesson/
router.get('/', (req, res) => {
    Lesson.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Lesson :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Lesson.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Lesson :' + JSON.stringify(err, undefined, 2)); }
    });
});
router.post('/', (req, res) => {
    var lesson = new Lesson({
        lessonName: req.body.lessonName,
        title: req.body.title,
        imgURL: req.body.imgURL,
        description: req.body.description,
    });
    lesson.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Lesson Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var lesson = {
        lessonName: req.body.lessonName,
        title: req.body.title,
        imgURL: req.body.imgURL,
        description: req.body.description,
    };
    Lesson.findByIdAndUpdate(req.params.id, { $set: lesson }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Lesson Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Lesson.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Lesson Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;