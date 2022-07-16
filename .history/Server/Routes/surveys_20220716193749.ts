// modules required for routing
import express from 'express';
import { CallbackError } from 'mongoose';
const router = express.Router();
export default router;

// define the survey model
import survey from '../Models/survey';

/* GET surveys List page. READ */
router.get('/surveys', (req, res, next) => 
{
  // find all surveys in the surveys collection
  survey.find( (err, surveys) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('surveys/index', {
        title: 'Surveys',
        page: 'surveys',
        surveys: surveys
      });
    }
  }).sort({name: 1});

});

//  GET the Survey Details page in order to add a new Survey
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    res.render('surveys/details', {
      title: 'Creating Survey',
      page: 'details',
      surveys: ''
    })

});

// POST process the Survey Details page and create a new Survey - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    let newSurvey = new survey
  ({
      "name": req.body.name,
      "questionsTitle": req.body.questions.$.title
  })

  survey.create(newSurvey, function(err: CallbackError)
  {
    if (err)
    {
      console.error(err);
      res.end(err);
    }
    res.redirect('/surveys');
  })
});

// GET the Survey Details page in order to edit an existing Survey
router.get('/edit/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    let id = req.params.id;
    survey.findById(id, {}, {}, function(err,surveysToEdit)
    {
      if (err)
      {
        console.error(err);
        res.end(err);
      }
      res.render('surveys/details', {title: 'Edit Survey', page: 'edit', surveys: surveysToEdit})
    });
});

// POST - process the information passed from the details form and update the document
router.post('/edit/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    let id = req.params.id;
    let updateSurveys = new survey
    ({
      "_id": id,
      "name": req.body.name,
      "questionsTitle": req.body.questions.$.title
    });

    survey.updateOne({_id: id}, updateSurveys, function(err: CallbackError)
    {
      if (err)
      {
        console.error(err);
        res.end(err);
      }
      res.redirect('/surveys');
    });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    let id = req.params.id;
    survey.remove({_id: id}, function(err: CallbackError)
    {
      if(err)
      {
        console.error(err);
        res.end(err);
      }
      res.redirect('/surveys');
    })
});


//module.exports = router;
