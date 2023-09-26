const express = require('express');
const furni = express();
const taskController = require('../controllers/taskController');

furni.get('/', taskController.defaultRoute);
furni.get('/about', taskController.aboutRoute);
furni.get('/blog', taskController.blogRoute);
furni.get('/cart', taskController.cartRoute);
furni.get('/checkout', taskController.checkoutRoute);
furni.get('/contact', taskController.contactRoute);
furni.get('/services', taskController.servicesRoute);
furni.get('/shop', taskController.shopRoute);
furni.get('/thankyou', taskController.thankyouRoute);


module.exports = furni;