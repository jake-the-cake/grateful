"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const db = new mongoose_1.default.Connection();
console.log(db);
// const x = async () => {
// 	const conn = await mongoose.createConnection('mongodb://127.0.0.1:27017/test').asPromise()
// 	console.log( conn.readyState )
// }
// x()
