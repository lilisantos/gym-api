var express = require("express");
var router = express.Router();

var slotsController = require('../src/controller/slots')();

router.get("/", function(req, res, next){
    res.send("You are inside slots");
});

//Get all slots
router.get('/get', slotsController.getController);
//Get slot by id
router.get('/getById/:id', slotsController.getById);
//Get slots based on date
router.get('/getByDate/:date', slotsController.getByDate);
//Add a new slot
router.post('/add', slotsController.postController);
//Update the status of an issue 
router.put('/:slot_id', slotsController.update);

module.exports = router;