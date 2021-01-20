const { render } = require('ejs');
const { Router } = require('express');
const express = require('express');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify',false);
mongoose.set('useCreateIndex', true);
var ObjectId = require('mongoose').Types.ObjectId;
var path = require('path');
var router = express.Router();
//call model

const grammar = require('../models/grammar.model');

router.get('/', function(req, res){
    grammar.find((err,docs) => {
        if (!err) { res.send(docs);}
        else { console.log('Error in Retriving Cate :' + JSON.stringify(err, undefined, 2)); }
    });
});
router.post('/', function(req, res){
    var newgrammar = new grammar({
        name: req.body.name,
        content: req.body.content,
        example: req.body.example
    });
    newgrammar.save(function(err){
        if(err){ console.log("Save Cate error!!" + err); res.json({kq: 0}); }
        else{ console.log("Save successfully!"); res.json({kq: 1});}
    });
});
router.put('/:id', function(req, res){
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var lesson = {
        name: req.body.name,
        content: req.body.content,
        example: req.body.example
    };
    grammar.findByIdAndUpdate(req.params.id, { $set: lesson }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Lesson Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', function(req, res){
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    grammar.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Lesson Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;