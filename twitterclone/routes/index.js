
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

router.get('/', (req, res, next) => { 
    res.render('index'); 
});

module.exports = router;