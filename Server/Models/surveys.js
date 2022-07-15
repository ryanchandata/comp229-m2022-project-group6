"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const BookSchema = new Schema({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
}, {
    collection: "surveys"
});
const Model = mongoose_1.default.model('Survey', BookSchema);
exports.default = Model;
//# sourceMappingURL=surveys.js.map