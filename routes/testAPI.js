var express = require("express");
var router = express.Router();

const personalController = require('../src/controller/personal')();

// router.get("/", function(req, res, next){
//     res.send({personal});
// });

//Add new personal
router.post('/personal', function(req, res, next){
    personalController.postController
  });
  //Get personal trainers
router.get('/personal', function(req, res, next){
    personalController.getController
 });

module.exports = router;