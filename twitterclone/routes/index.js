
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

const tweet = require('../models/tweet');

router.get('/', (req, res, next) => { 
    tweet.find((err, docs) => {
        let tweets = [];
        for (let i = 0; i < docs.length; i += 1) {
            tweets.push(docs.slice(i, i + 1));
        }
        res.render('index', {
            tweets: tweets, login: req.isAuthenticated(), user: req.user
        });
    });
});
module.exports = router;

