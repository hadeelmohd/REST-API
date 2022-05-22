const express = require('express');
const router = express.Router();

const followController = require('../controllers/followController');

router.post("/:id", followController.follow); 
//follow is a method inside followcontroller and its used in route id 
//id to identify which user we want to follow
module.exports = router;
