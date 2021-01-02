const { render } = require('ejs');
const express = require('express');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify',false);
mongoose.set('useCreateIndex', true);
var ObjectId = require('mongoose').Types.ObjectId;

const  Vocab  = require('../models/vocabulary.model');
// const Vocab = mongoose.model('Vocabulary');
var router = express.Router();

router.get("/", function(req,res){
    //res.render("vocabulary");
    Vocab.find((err,docs) => {
        if(!err){res.send(docs);}
        else { console.log('Error in Retriving Lesson :' + JSON.stringify(err, undefined, 2)); }
    })
});
router.get('/:id', (req, res) => {
    // if (!ObjectId.isValid(req.params.id))
    //     return res.status(400).send(`No record with given id : ${req.params.id}`);

    // newVocab.findById(req.params.id, (err, doc) => {
    //     if (!err) { res.send(doc); }
    //     else { console.log('Error in Retriving Lesson :' + JSON.stringify(err, undefined, 2)); }
    // });
    Vocab.findById(req.params.id, function (err, vocab) {
        if (err) return res.send(err);
        res.json(vocab);
      });
});
router.post("/", function(req,res) {
    var newVocab = new Vocab({
        vocabTitle: req.body.vocabTitle,
        vocabTopic: req.body.vocabTopic,
        vocabContent: req.body.vocabContent,
        vocabEx: req.body.vocabEx
    });
    newVocab.save((err,doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Lesson Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id',(req,res) => {
    // if(!ObjectId.isValid(req.params.id))
    // return res.status(400).send(`No record with given id : ${req.params.id}`);

    // var newVocab = {
    //     vocabTitle: req.body.vocabTitle,
    //     vocabTopic: req.body.vocabTopic,
    //     vocabContent: req.body.vocabContent,
    //     vocabEx: req.body.vocabEx
    // };
    // Vocab.findByIdAndUpdate(req.params.id, {$set: newVocab},{ new: true }, (err, doc) =>{
    //     if (!err) { res.send(doc); }
    //     else { console.log('Error in Lesson Update :' + JSON.stringify(err, undefined, 2)); }
    // });
    Vocab.findById(req.params.id, function(err, vocab) {

		if (err) return res.send(err);

		//set the new user information if it exists in the request
		if(req.body.vocabTitle) vocab.vocabTitle = req.body.vocabTitle;
		if(req.body.vocabTopic) vocab.vocabTopic = req.body.vocabTopic;
		if(req.body.vocabContent) vocab.vocabContent = req.body.vocabContent;
        if(req.body.vocabEx) vocab.vocabEx = req.body.vocabEx;
		//save the user
		vocab.save(function(err) {
			if(err) return res.send(err);

			//return a message
			res.json({ message: 'Lesson updated!' });
		});
	});
});
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Vocab.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Lesson Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;