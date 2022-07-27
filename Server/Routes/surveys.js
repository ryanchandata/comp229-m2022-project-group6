"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const survey_1 = require("../Controllers/survey");
router.get('/survey', survey_1.DisplaySurveyList);
router.get('/add', survey_1.DisplayAddPage);
router.post('/edit/:id', survey_1.DisplayEditPage);
router.post('/add', survey_1.ProcessAddPage);
router.post('/edit/:id', survey_1.ProcessEditPage);
router.post('/delete/:id', survey_1.ProcessDeletePage);
exports.default = router;
//# sourceMappingURL=surveys.js.map