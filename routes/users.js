var express = require('express');
var router = express.Router();

var usersController = require('../src/controller/users')();

router.get("/", function(req, res, next){
    res.send("You are inside users");
});

/* GET users listing. */
router.get('/users', usersController.getAll); // get all users
router.get('/users/:email', usersController.getOne); //get individual user
router.post('/users', usersController.addOne);

module.exports = router;
