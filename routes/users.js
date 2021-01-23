var express = require('express');
var router = express.Router();

var usersController = require('../src/controller/users')();

router.get("/", function(req, res, next){
    res.send("You are inside users");
});

/* GET users listing. */
router.get('/get', usersController.getAll); // get all users
router.get('/:email', usersController.getOne); //get individual user
router.post('/add', usersController.addOne);

module.exports = router;
