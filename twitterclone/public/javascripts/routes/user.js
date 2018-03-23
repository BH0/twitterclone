let express = require('express');
let router = express.Router();
let passport = require('passport');
let mongoose = require('mongoose'); 

let Private = require('../private/private');
let Tweet = require('../models/tweet'); 

mongoose.connect(Private.database_instance); 

/// Tweet 
router.post('/tweet', (req, res, next) => {
    let tweet = req.body.tweet; 
    let author = req.body.author; 

    res.send('Your tweet was sent');
}); 

/// Add Friend 


/// Display Friends 

router.get('/profile', (req, res, next) => {
    res.render('user/profile');
});

router.get('/signout', (req, res, next) => {
    req.logout();
    res.redirect('/'); 
}); 

router.use('/', (req, res, next) => {
    next();
});

router.get('/signup', (req, res, next) => {
    res.render('user/signup'); 
});

router.get('/signin', (req, res, next) => {
    res.render('user/signin'); 
}); 

router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: '/user/profile',
    faulreRerect: '/user/signin' 
})); 

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup' 
})); 

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        console.log("Is loggged in"); 
        return next();
    } 
    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        console.log("Is NOT loggged in");
        return next();
    }
    res.redirect('/'); 
}

