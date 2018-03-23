let express = require('express');

let mongoose = require('mongoose'); 

let router = express.Router(); 

/* GET home page. */
router.get('/', function (req, res, next) {     
      res.render('index'); 
});

module.exports = router;
