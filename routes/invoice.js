var express = require("express");
var router = express.Router();

var invoiceController = require('../src/controller/invoice')();

router.get("/", function(req, res, next){
    res.send("You are inside invoice");
});

router.get('/get', invoiceController.getController);
//Get by id
router.get('/getById/:id', invoiceController.getById);
//Get by member
router.get('/getByMember/:userEmail', invoiceController.getByMember);
router.post('/add', invoiceController.postController);


module.exports = router;