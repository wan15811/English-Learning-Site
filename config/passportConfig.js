const passport = require('passport');
const localStratery = require('passport-local');
const mongoose = require('mongoose');

var User = mongoose.model('User');

passport.use(
    new localStratery({usernameField: 'email'},
    (username, password, done) => {
        User.findOne({email: username},
            (err, user) => {
                if(err)
                    return done(err);
                //unknow user
                else if (!user)
                    return done(null, false, {message: 'This Email is not register'});
                //wrong password
                else if(!user.verifyPassword(password))
                    return done(null, false, {message: 'Wrong password!!!'});
                // authentication succeeded
                else    
                    return done(null, user);
            });
    })
);