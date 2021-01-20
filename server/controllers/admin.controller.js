const e = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
// const Admin = mongoose.model('Admin');
const Admin = require('../models/admin.model');
module.exports.adminregister = (req,res,next) => {
    var admin = new Admin();
    admin.email = req.body.email; 
    admin.password = req.body.password;
    admin.save((err, doc) => {
        if(!err)
            res.send(doc);
        else
        {
            if(err.code == 11000)
                res.status(422).send(['Duplicate email address found.']);
            else
                return next(err);
        }
            
    });
}
module.exports.adminauthenticate = (req,res,next) => {
    //call for passport authentication
    passport.authenticate('local', (err,admin,info) => {
        //error from passport middleware
        if(err) return res.status(400).json(err);
        //register admin
        else if (admin) return res.status(200).json({"token": admin.generateJwt() });
        //unknow admin or wrong password
        else return res.status(404).json(info);
    })(req,res);
}

// module.exports.adminProfile = (req,res,next) =>  {
//     Admin.findOne({_id: req._id},
//         (err, admin) => {
//             if(!admin)
//                 return res.status(404).json({status: false, message: 'admin record not found'});
//             else
//                 return res.status(200).json({status: true, admin: _.pick(admin, [ 'email']) });
//         });
// }