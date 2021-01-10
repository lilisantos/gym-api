var express = require("express");
var router = express.Router();

var personalController = require('../src/controller/personal')();

router.get("/", function(req, res, next){
    res.send("You are inside personal trainer");
});

router.get('/get', personalController.getController);
router.post('/add', personalController.postController);

module.exports = router;