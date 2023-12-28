const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');

router.get('/icons', homeController.getHomePageData);
// router.post('/icons', homeController.postHomePageData);

module.exports = router;
