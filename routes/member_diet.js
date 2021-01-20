var express = require("express");
var router = express.Router();

var member_dietController = require('../src/controller/member_diet')();

router.get("/", function(req, res, next){
    res.send("You are inside members diet ----- Carbs and pros= 4kcal, Fat=7kcal per gram");
});

router.get('/get', member_dietController.getController);
router.post('/add', member_dietController.postController);
//Update diet
router.put('/:member_id', member_dietController.update);

module.exports = router;