var express = require("express");
var router = express.Router();

var memberController = require('../src/controller/member')();

router.get("/", function(req, res, next){
    res.send("You are inside members");
});

router.get('/get', memberController.getController);
router.post('/add', memberController.postController);
//Get member id by email
router.get('/getByEmail', memberController.getByEmail);

module.exports = router;