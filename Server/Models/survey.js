"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const surveySchema = new Schema({
    SurveyID: String,
    user: String,
    name: String,
    dateCreated: {
        type: String,
        default: new Date().toISOString()
    },
    dateActive: {
        type: String,
        default: new Date().toISOString()
    },
    dateExpire: String,
    responses: {
        type: Number,
        default: 0
    },
    questions: [{
            questionID: String,
            title: String,
            optionType: String,
            options: [{
                    details: String,
                    count: {
                        type: Number,
                        default: 0
                    }
                }]
        }]
}, {
    collection: "surveys"
});
const Model = mongoose_1.default.model("Survey", surveySchema);
exports.default = Model;
//# sourceMappingURL=survey.js.map