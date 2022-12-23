"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GratefulModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Grateful = new mongoose_1.default.Schema({
    user: {
        type: String,
        required: true
    },
    note: String,
    votes: Number,
    reports: Number
}, { timestamps: true });
exports.GratefulModel = mongoose_1.default.model('Grateful', Grateful);
