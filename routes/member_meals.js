var express = require("express");
var router = express.Router();

var member_mealsController = require('../src/controller/member_meals')();

router.get("/", function(req, res, next){
    res.send("You are inside member_meals");
});

//Get current bookings
router.get('/get', member_mealsController.getController);
//Add a new meal
router.post('/add', member_mealsController.postController);

module.exports = router;