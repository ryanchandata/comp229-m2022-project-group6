import { CallbackError } from 'mongoose';
import express from 'express';

import Survey from '../Models/survey';

import {UserDisplayName} from '../Util';

export function DisplayMovieList(req: express.Request, res: express.Response, next: express.NextFunction)
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
    Movie.findById(id, {}, {}, function(err,movieToEdit)
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        //show the edit view with the data
        res.json({success: true, msg: 'Edit Page Displayed Successfully', movies: movieToEdit});

    });
}

export function ProcessAddPage(req: express.Request, res: express.Response, next: express.NextFunction):void
{
    //instantiate a new Movie to add
    let newMovie = new Movie({
        "Name": req.body.movieName,
        "Director": req.body.movieDirector,
        "Year": req.body.movieYear,
        "Rating": req.body.movieRating
    });

    //Insert the new Movie object into the database (movie collection)
    Movie.create(newMovie, function(err: CallbackError)
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        //new movie has been added -> refresh the movie-list
        res.json({success: true, msg: 'Successfully Added Movie', movie: newMovie});
    })
}

export function ProcessEditPage(req: express.Request, res: express.Response, next: express.NextFunction):void
{
    let id = req.params.id;

    //instantiate a new Movie to Edit
    let updatedMovie = new Movie
    ({
        "_id": id,
        "Name": req.body.movieName,
        "Director": req.body.movieDirector,
        "Year": req.body.movieYear,
        "Rating": req.body.movieRating
    });

    //update the movie in the database
    Movie.updateOne({_id: id}, updatedMovie, function(err: CallbackError)
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        //edit was successful -> go to the movie-list page
        res.json({success: true, msg: 'Successfully Edited Movie', movie: updatedMovie});
    });
}

export function ProcessDeletePage(req: express.Request, res: express.Response, next: express.NextFunction): void
{
    let id = req.params.id;

    //pass the id to the database and delete the movie
    Movie.remove({_id: id}, function(err: CallbackError)
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        //delete was successful
        res.json({success: true, msg: 'Successfully Deleted Movie'});
    });
}