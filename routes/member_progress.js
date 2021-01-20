var express = require("express");
var router = express.Router();

var member_progressController = require('../src/controller/member_progress')();

router.get("/", function(req, res, next){
    res.send("You are inside members progress");
});

router.get('/get', member_progressController.getController);
router.post('/add', member_progressController.postController);

module.exports = router;