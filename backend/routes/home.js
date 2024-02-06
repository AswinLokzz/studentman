const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');
var middleware =  require('../middleware/middleware.js')

router.get('/icons',middleware.auth, homeController.getHomePageData);
// router.post('/icons', homeController.postHomePageData);

module.exports = router;
