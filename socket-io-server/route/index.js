var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.send({response: "I am alive"}).status(200);
});
