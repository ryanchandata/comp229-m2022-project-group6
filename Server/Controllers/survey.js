"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessDeletePage = exports.ProcessEditPage = exports.ProcessAddPage = exports.DisplayEditPage = exports.DisplayAddPage = exports.DisplayMovieList = void 0;
const survey_1 = __importDefault(require("../Models/survey"));
function DisplayMovieList(req, res, next) {
    survey_1.default.find(function (err, surveysCollection) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.json({ success: true, msg: 'Survey Displayed Successfully', surveys: surveysCollection, user: req.user });
    });
}
exports.DisplayMovieList = DisplayMovieList;
function DisplayAddPage(req, res, next) {
    res.json({ success: true, msg: 'Add Page Displayed Successfully' });
}
exports.DisplayAddPage = DisplayAddPage;
function DisplayEditPage(req, res, next) {
    let id = req.params.id;
    survey_1.default.findById(id, {}, {}, function (err, surveyToEdit) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.json({ success: true, msg: 'Edit Page Displayed Successfully', surveys: surveyToEdit });
    });
}
exports.DisplayEditPage = DisplayEditPage;
function ProcessAddPage(req, res, next) {
    let newSurvey = new survey_1.default({
        "Name": req.body.movieName,
        "Director": req.body.movieDirector,
        "Year": req.body.movieYear,
        "Rating": req.body.movieRating
    });
    Movie.create(newMovie, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.json({ success: true, msg: 'Successfully Added Movie', movie: newMovie });
    });
}
exports.ProcessAddPage = ProcessAddPage;
function ProcessEditPage(req, res, next) {
    let id = req.params.id;
    let updatedMovie = new Movie({
        "_id": id,
        "Name": req.body.movieName,
        "Director": req.body.movieDirector,
        "Year": req.body.movieYear,
        "Rating": req.body.movieRating
    });
    Movie.updateOne({ _id: id }, updatedMovie, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.json({ success: true, msg: 'Successfully Edited Movie', movie: updatedMovie });
    });
}
exports.ProcessEditPage = ProcessEditPage;
function ProcessDeletePage(req, res, next) {
    let id = req.params.id;
    Movie.remove({ _id: id }, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.json({ success: true, msg: 'Successfully Deleted Movie' });
    });
}
exports.ProcessDeletePage = ProcessDeletePage;
//# sourceMappingURL=survey.js.map