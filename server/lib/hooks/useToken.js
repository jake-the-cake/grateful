"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSignedToken = void 0;
const errorLogHandlers_1 = require("../handlers/errorLogHandlers");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import dotenv from 'dotenv'
// dotenv.config()
const useSignedToken = (data, type) => {
    let token;
    switch (type) {
        case 'access':
            token = jsonwebtoken_1.default.sign(data, process.env.ACCESS_HUSH, { expiresIn: 10000 });
            return token;
        case 'refresh':
            token = jsonwebtoken_1.default.sign(data, process.env.REFRESH_HUSH, { expiresIn: 60000 });
            return token;
        default:
            return (0, errorLogHandlers_1.createErrorLog)('unknown');
    }
};
exports.useSignedToken = useSignedToken;
