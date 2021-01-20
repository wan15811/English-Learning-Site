const { render } = require('ejs');
const { Router } = require('express');
const express = require('express');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify',false);
mongoose.set('useCreateIndex', true);
var ObjectId = require('mongoose').Types.ObjectId;
var path = require('path');
var router = express.Router();
//config multer
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()  + "-" + file.originalname)
    }
});  
var upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        console.log(file);
        if( file.mimetype=="image/bmp" || 
            file.mimetype=="image/png" ||
            file.mimetype=="image/jpg" ||
            file.mimetype=="image/gif" ||
            file.mimetype=="image/jpeg"){
            cb(null, true)
        }else{
            return cb(new Error('Only image are allowed!'))
        }
    }
}).single("vocabImg");

//call model
const VocabCate = require('../models/vocabcate.model');
const Vocabulary = require('../models/vocabulary.model');
//get all vocabulary categories
router.get('/', function(req, res){
    VocabCate.find((err,docs) => {
        if (!err) { res.send(docs);}
        else { console.log('Error in Retriving Cate :' + JSON.stringify(err, undefined, 2)); }
    });
});
//post new categories
router.post('/', function(req, res){
    var newcate = new VocabCate({
        vocabCate: req.body.vocabCate
    });
    newcate.save(function(err){
        if(err){ console.log("Save Cate error!!" + err); res.json({kq: 0}); }
        else{ console.log("Save successfully!"); res.json({kq: 1});}
    });
});
//put categories
router.put('/:id',(req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var lesson = {
        vocabCate: req.body.vocabCate
    };
    VocabCate.findByIdAndUpdate(req.params.id, { $set: lesson }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Lesson Update :' + JSON.stringify(err, undefined, 2)); }
    });

});

//delete categories
router.delete('/:id', function(req, res){
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    VocabCate.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Lesson Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

//get all vocabulary 
router.get('/:cate_id/word', function(req, res){
    Vocabulary.find({
        cate_id: req.params.cate_id
    })
    .then((words)=>{
        res.send(words);
    });
});
//delete vocabulary 
router.delete('/:id/word/:vocab_id', function(req, res){
    console.log(req.params.id)
    console.log(req.params.vocab_id)
    VocabCate.findOne({
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
            Vocabulary.findOneAndRemove({
                cate_id: req.params.id,
                _id: req.params.vocab_id
                
            }).then((docs)=>{
                res.send(docs);
            })
        }else{
            res.sendStatus(404);
        }
    });
});

//post new vocabulary lesson according to vocab categories
// router.post('/:cate_id/word', function(req, res){
//     VocabCate.findOne({
//         _id: req.params.cate_id
//     }).then((lesson)=>{
//         upload(req, res, function(err){
//             if(err instanceof multer.MulterError){
//                 console.log("A Multer error occurred when uploading."); 
//                 res.json({kq: 0, "err": err});
//             }else if(err){
//                 console.log("An unknown error occurred when uploading." + err);
//                 res.json({kq: 0, "err": err});
//             }else{
//             console.log("Upload is okay");
//             console.log(req.file);
//             }
            
//         }
//         )
//         console.log(lesson);
//         if(lesson){return true;}
//         return false;
//     }).then((cancreate)=>{
//         if(cancreate){
//             let newLesson = new Vocabulary({
//                 cate_id: req. params.cate_id,
//                 vocabWord: req.params.vocabWord,
//                 vocabDescription: req.params.vocabDescription,
//                 vocabImg: req.file.filename
//             });
//             newLesson.save().then((docs)=>{
//                 res.send(docs);
//             })
//         }else{
//             res.sendStatus(404);
//         }
        
//     })
// })

router.post('/:cate_id/word', function(req, res){
    VocabCate.findOne({_id: req.params.cate_id})
    .then((lesson)=>{
        console.log(lesson);
        if(lesson){return true;}
        return false;
    }).then((cancreate)=>{
        if(cancreate){
            let newlesson = new Vocabulary({
                cate_id: req.params.cate_id,
                vocabWord: req.body.vocabWord,
                vocabDescription: req.body.vocabDescription
            });
            newlesson.save().then((docs)=>{
                res.send(docs);
            })
        }else {res.sendStatus(404);}
    })
})

module.exports = router;