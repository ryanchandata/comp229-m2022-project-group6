import { CallbackError } from 'mongoose';
import express from 'express';

import Survey from '../Models/survey';

import {UserDisplayName} from '../Util';

export function DisplaySurveyList(req: express.Request, res: express.Response, next: express.NextFunction)
{
    Survey.find(function(err, surveysCollection)
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        res.json({success: true, msg: 'Survey Displayed Successfully', surveys: surveysCollection, user:req.user});

    })
}

export function DisplayAddPage(req: express.Request, res: express.Response, next: express.NextFunction):void
{
    res.json({success: true, msg: 'Add Page Displayed Successfully'});
}

export function DisplayEditPage(req: express.Request, res: express.Response, next: express.NextFunction):void
{
    let id = req.params.id;

    //pass the id to the db and read the movie into the edit page
    Survey.findById(id, {}, {}, function(err,surveyToEdit)
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        //show the edit view with the data
        res.json({success: true, msg: 'Edit Page Displayed Successfully', surveys: surveyToEdit});

    });
}

export function ProcessAddPage(req: express.Request, res: express.Response, next: express.NextFunction):void
{
    //instantiate a new Survey to add
    let newSurvey = new Survey({
        "Name": req.body.movieName,
        "Director": req.body.movieDirector,
        "Year": req.body.movieYear,
        "Rating": req.body.movieRating
    });

    //Insert the new Survey object into the database (survey collection)
    Survey.create(newSurvey, function(err: CallbackError)
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        //new movie has been added -> refresh the movie-list
        res.json({success: true, msg: 'Successfully Added Survey', survey: newSurvey});
    })
}

export function ProcessEditPage(req: express.Request, res: express.Response, next: express.NextFunction):void
{
    let id = req.params.id;

    //instantiate a new Survey to Edit
    let updatedSurvey = new Survey
    ({
        "_id": id,
        "Name": req.body.movieName,
        "Director": req.body.movieDirector,
        "Year": req.body.movieYear,
        "Rating": req.body.movieRating
    });

    //update the survey in the database
    Survey.updateOne({_id: id}, updatedSurvey, function(err: CallbackError)
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        //edit was successful -> go to the survey page
        res.json({success: true, msg: 'Successfully Edited Survey', survey: updatedSurvey});
    });
}

export function ProcessDeletePage(req: express.Request, res: express.Response, next: express.NextFunction): void
{
    let id = req.params.id;

    //pass the id to the database and delete the movie
    Survey.remove({_id: id}, function(err: CallbackError)
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        //delete was successful
        res.json({success: true, msg: 'Successfully Deleted Survey'});
    });
}