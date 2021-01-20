const { render } = require('ejs');
const { Router } = require('express');
const express = require('express'); 
const mongoose = require('mongoose');
mongoose.set('useFindAndModify',false);
mongoose.set('useCreateIndex', true);
var router = express.Router();

//call model
const  Vocab  = require('../models/vocabulary.model');
const VocabCate = require('../models/vocabcate.model');
// config multer
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


router.get('/', (req, res) => {
    VocabCate.find(function(err, items){
        if(err){
            res.send("Error");
        }else{
            console.log(items);
            res.render("vocabulary", {Cates: items});
        }
    });
    
});

router.get('/:id', (req, res) => {
    Vocab.findById(req.params.id, function (err, vocab) {
        if (err) return res.send(err);
        res.json(vocab);
      });
});

//create vocabulary theo cate
router.post('/', (req, res) => {
    //upload file
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          console.log("A Multer error occurred when uploading."); 
          res.json({kq: 0, "err": err});
        } else if (err) {
          console.log("An unknown error occurred when uploading." + err);
          res.json({kq: 0, "err": err});
        }else{
            console.log("Upload is okay");
            console.log(req.file); // Thông tin file đã upload
            //save vocabulary
            var vocab = new Vocab({
                vocabWord: req.body.vocabWord,
                vocabImg: req.file.filename, 
                vocabDescription: req.body.vocabDescription
            });
            vocab.save(function(err){
                if(err){ res.json({kq: 0, "error": err}); }
               else { 
                   // update vocab_id
                    Vocab.findOneAndUpdate(
                        {_id: vocab._id},
                        { $push: 
                            {
                                cate_id: req.body.selectCate
                            }
                        },
                         function(err){
                            if(err){
                                res.json({kq: 0, "error" : err});
                            }else{
                                res.json({kq: 1});
                            }
                    }); 
                    
                }
            });
        }

    });
});




module.exports = router;