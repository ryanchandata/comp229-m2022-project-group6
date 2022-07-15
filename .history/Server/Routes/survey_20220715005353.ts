// modules required for routing
import express from 'express';
const router = express.Router();
export default router;

// define the survey model
import survey from '../Models/survey';

/* GET survey List page. READ */
router.get('/', (req, res, next) => 
{
  // find all books in the books collection
  survey.find( (err, survey) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('survey/index', {
        title: 'Survey',
        page: 'survey',
        survey: survey
      });
    }
  });

});

//  GET the Survey Details page in order to add a new Survey
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

});

// POST process the  Details page and create a new Survey - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
});


//module.exports = router;
