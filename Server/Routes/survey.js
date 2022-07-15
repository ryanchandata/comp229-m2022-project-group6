"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const survey_1 = __importDefault(require("../Models/survey"));
router.get('/', (req, res, next) => {
    survey_1.default.find((err, survey) => {
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
router.get('/add', (req, res, next) => {
});
router.post('/add', (req, res, next) => {
});
router.get('/:id', (req, res, next) => {
});
router.post('/:id', (req, res, next) => {
});
router.get('/delete/:id', (req, res, next) => {
});
//# sourceMappingURL=survey.js.map