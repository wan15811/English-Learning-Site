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
const grammarCate = require('../models/grammarcate.model');
const grammarLesson = require('../models/grammar.model');

router.get('/', function(req, res){
    grammarCate.find((err,docs) => {
        if (!err) { res.send(docs);}
        else { console.log('Error in Retriving Cate :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', function(req, res){
    var newcate = new grammarCate({
        title: req.body.title
    });
    newcate.save(function(err){
        if(err){ console.log("Save Cate error!!" + err); res.json({kq: 0}); }
        else{ console.log("Save successfully!"); res.json({kq: 1});}
    });
});

router.put('/:id', function(req, res){
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var lesson = {
        title: req.body.title
    };
    grammarCate.findByIdAndUpdate(req.params.id, { $set: lesson }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Lesson Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', function(req, res){
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    grammarCate.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Lesson Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

//get all grammar lesson
router.get('/:id/grammar', function(req, res){
    grammarLesson.find({
        cate_id: req.params.id
    })
    .then((lessons)=>{
        res.send(lessons);
    });
});
//get grammar lesson
router.get(':id/grammar/:grammar_id', function(req, res){
    grammarLesson.findOne({
        _id: req.params.grammar_id,
        cate_id: req.params.id
    }).then((lesson)=>{
        res.send(lesson);
    });
});

//post new grammar lesson according to grammar categories
router.post('/:id/grammar', function(req, res){
    grammarCate.findOne({
        _id: req.params.id
    })
    .then((lesson)=>{
        console.log(lesson);
        if(lesson){return true;}
        return false;
    })
    .then((cancreateGrammarLesson)=>{
        if(cancreateGrammarLesson){
            let newLesson = new grammarLesson({
                cate_id:req.params.id,
                name: req.body.name,
                content: req.body.content,
                example: req.body.example
            });
            newLesson.save().then((docs)=>{
                res.send(docs);
            })
        }else{
            res.sendStatus(404);
        }
    });
});
//update grammar lesson
router.put('/:id/grammar/:grammar_id', function(req, res){
    console.log(req.params.id)
    console.log(req.params.grammar_id)
    console.log(req.body)

    grammarCate.findOne({
        _id:req.params.id
    })
    .then((cate)=>{
        console.log(cate)
        if(cate){return true;}
        return false;
    })
    .then((canupdateLesson)=>{
        if(canupdateLesson){
            grammarLesson.findOneAndUpdate({
                _id: req.params.grammar_id,
                cate_id:req.params.id
            },{

                $set: req.body
            
            }).then(()=>{
                res.send({message: 'Update Successfully.'})
            })
        }else{
            res.sendStatus(404);
        }
    });
});

//delete grammar lesson
router.delete('/:id/grammar/:grammar_id', function(req, res){
    console.log(req.params.id)
    console.log(req.params.grammar_id)
    grammarCate.findOne({
        _id: req.params.id
    })
    .then((cate)=>{
        console.log(cate)
        if(cate){return true;}
        return false;
    })
    .then((candelete)=>{
        console.log(candelete)
        if(candelete){
            grammarLesson.findOneAndRemove({
                cate_id: req.params.id,
                _id: req.params.grammar_id
                
            }).then((docs)=>{
                res.send(docs);
            })
        }else{
            res.sendStatus(404);
        }
    });
});


module.exports = router;