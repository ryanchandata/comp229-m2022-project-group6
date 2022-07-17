"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const survey_1 = __importDefault(require("../Models/survey"));
router.get('/surveys', (req, res, next) => {
    survey_1.default.find((err, surveys) => {
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
    }).sort({ name: 1 });
});
router.get('/add', (req, res, next) => {
    res.render('surveys/add', {
        title: 'Creating Survey',
        page: 'add',
        surveys: ''
    });
});
router.post('/add', (req, res, next) => {
    let questionsTitles = [
        req.body.question1,
        req.body.question2
    ];
    let optionDetails = [
        req.body.options1,
        req.body.options2,
        req.body.options3,
        req.body.options4,
        req.body.options5,
        req.body.options6,
        req.body.options7,
        req.body.options8
    ];
    let optionType = [
        req.body.optionType1,
        req.body.optionType2
    ];
    let optionsArray = [];
    let questionsArray = [];
    for (let i = 0; i < optionDetails.length; i++) {
        optionsArray.push({
            "details": optionDetails[i]
        });
    }
    for (let i = 0; i < questionsTitles.length; i++) {
        questionsArray.push({
            "title": questionsTitles[i],
            "optionType": optionType[i],
            "options": optionsArray
        });
    }
    let newSurvey = new survey_1.default({
        "name": req.body.name,
        "questions": questionsArray
    });
    survey_1.default.create(newSurvey, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/surveys');
    });
});
router.get('/edit/:id', (req, res, next) => {
    let id = req.params.id;
    survey_1.default.findById(id, {}, {}, function (err, surveysToEdit) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('surveys/details', { title: 'Edit Survey', page: 'edit', surveys: surveysToEdit });
    });
});
router.post('/edit/:id', (req, res, next) => {
    let id = req.params.id;
    let updateSurveys = new survey_1.default({
        "_id": id,
        "name": req.body.name,
        "title": req.body.questionsArray.title,
        "optionType": req.body.questionsArray.optionType,
    });
    survey_1.default.updateOne({ _id: id }, updateSurveys, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/surveys');
    });
});
router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;
    survey_1.default.remove({ _id: id }, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/surveys');
    });
});
//# sourceMappingURL=surveys.js.map