const express = require('express');
const router = express();
const TaskControllers = require('../controllers/controllers')
const bannerUpload = require('../middlewares/bannerMiddelware')

router.get('/', TaskControllers.defaultRoute)
router.post('/addMovie', bannerUpload.single('banner'), TaskControllers.addMovie)
router.get('/editMovie/:id', TaskControllers.editMovie)
router.post('/updateMovie', bannerUpload.single('banner'), TaskControllers.updateMovie)
router.get('/deleteMovie/:id', TaskControllers.deleteMovie)
module.exports = router;
