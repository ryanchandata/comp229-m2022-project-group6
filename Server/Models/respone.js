"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const responeSchema = new Schema({
    SurveyID: String,
    Answers: [{
            QuestionID: String,
            OptionID: String,
            Value: String
        }]
}, {
    collection: "respones"
});
const Model = mongoose_1.default.model("Respone", responeSchema);
exports.default = Model;
//# sourceMappingURL=respone.js.map