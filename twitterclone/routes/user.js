
const mongoose = require('mongoose');

const express = require('express');
const router = express.Router();
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

const Tweet = require('../models/tweet');
const User = require('../models/user');
const Private = require('../private/private');

mongoose.connect(Private.database_instance);

router.get('/profile', isLoggedIn, (req, res, next) => {
    res.render('user/profile', { user: req.user });
});

///*** Tweet ***\\\
router.post('/profile/tweet', (req, res, next) => {
    let tweetObj = {
        tweet: req.body.tweet, 
        author: req.body.author
    }
    let tweet = new Tweet(tweetObj);
    tweet.save((err) => {
        if (err) {
            console.log(err);
            return;
        } 
        res.redirect("/"); // tweet successfully saved 
    });
});

///**************************\\\

router.get('/signout', isLoggedIn, (req, res, next) => {
    req.logout();
    res.redirect('/');
    console.log("User no longer logged in");
}); 

router.use('/', notLoggedIn, (req, res, next) => {
    next();
}); 

router.get('/signup', (req, res, next) => {
    res.render('user/signup'); 
}); 

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/profile', 
    failureRedirect: '/user/signup' 
}));

router.get('/signin', (req, res, next) => {
    res.render('user/signin');
}); 

router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin' 
})); 

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}