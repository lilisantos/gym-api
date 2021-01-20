var express = require("express");
var router = express.Router();

var slotsController = require('../src/controller/slots')();

router.get("/", function(req, res, next){
    res.send("You are inside slots");
});

//Get all slots
router.get('/get', slotsController.getController);
//Get slots based on date
router.get('/get/:date', slotsController.getByDate);
//Add a new booking
router.post('/add', slotsController.postController);
//Update the status of an issue 
router.put('/:slot_id', slotsController.update);

module.exports = router;