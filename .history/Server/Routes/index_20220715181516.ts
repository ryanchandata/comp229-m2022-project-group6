// modules required for routing
import express from 'express';
const router = express.Router();
export default router;

import mongoose from 'mongoose';

// define the survey model
import survey from '../Models/surveys';

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    page: 'home',
    survey: ''
   });
});

//module.exports = router;