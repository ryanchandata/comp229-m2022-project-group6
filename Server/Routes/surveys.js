"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const surveys_1 = __importDefault(require("../Models/surveys"));
router.get('/', (req, res, next) => {
    surveys_1.default.find((err, surveys) => {
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
//# sourceMappingURL=surveys.js.map