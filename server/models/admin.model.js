const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const jwtSecret = "51778657246321226641fsdklafjasdkljfsklfjd7148924065";
const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        require: 'Email can not be EMPTY!!!',
        unique: true
    },
    password: {
        type: String,
        require: 'Password can not be EMPTY!!!',
        minlength: [8, 'Password must be at least 8 character long']
    },
    saltSecret: String
});

// Custom validation for email
adminSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

// Events
adminSchema.pre('save', function(next) {
    var admin = this;
    // has the password only if the password has been changed or user is new
    if(!admin.isModified('password')) return next();
    //generate the hask
    bcrypt.hash(admin.password,null,null,function(err,hash) {
        if(err) return next(err);
        // change the password to the hasheds version
        admin.password = hash;
        next();
     });
});

// method to compare a given password with the database hash
adminSchema.methods.comparePassword = function(password)
{
    var admin = this;
    return bcrypt.compareSync(password,admin.password);
};

adminSchema.methods.generateAccessAuthToken = function () {
    const admin = this;
    return new Promise((resolve, reject) => {
        // Create the JSON Web Token and return that
        jwt.sign({ _id: admin._id.toHexString() }, jwtSecret, { expiresIn: "30m" }, (err, token) => {
            if (!err) {
                resolve(token);
            } else {
                // there is an error
                reject();
            }
        })
    })
}
adminSchema.statics.findByCredentials = function (email, password) {
    let Admin = this;
    return Admin.findOne({ email }).then((admin) => {
        if (!admin) return Promise.reject();

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, admin.password, (err, res) => {
                if (res) {
                    resolve(admin);
                }
                else {
                    reject();
                }
            })
        })
    })
}

module.exports = mongoose.model("Admin", adminSchema);
