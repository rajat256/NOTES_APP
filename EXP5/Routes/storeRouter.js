const express = require('express');
const path = require('path');
const storeRouter = express.Router();

// const rootDir = require('../utils/pathUtlis');
// const {registerHome} = require('./hostRouter');

const storeController = require('../controllers/storecontroller');


storeRouter.get("/",storeController.getIndex);
storeRouter.get("/homes",storeController.getHome);
storeRouter.get("/bookings",storeController.getBookings);
storeRouter.get("/favourites-list",storeController.getFavourites);

 module.exports = storeRouter;