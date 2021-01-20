var express = require("express");
var router = express.Router();

var bookingsController = require('../src/controller/bookings')();

router.get("/", function(req, res, next){
    res.send("You are inside bookings");
});

//Get current bookings
router.get('/get', bookingsController.getController);
//Get closest booking
router.get('/getFirst', bookingsController.getController);
//Add a new booking
router.post('/add', bookingsController.postController);
//Update the status of an issue 
router.put('/:booking_id', bookingsController.cancelBooking);

module.exports = router;