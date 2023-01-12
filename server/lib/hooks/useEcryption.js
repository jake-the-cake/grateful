"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHashData = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const errorLogHandlers_1 = require("../handlers/errorLogHandlers");
const useHashData = (data) => {
    if (typeof data !== 'object')
        return (0, errorLogHandlers_1.createErrorLog)('badobj');
    const promisedData = [];
    Object.entries(data).forEach(([k, v]) => {
        promisedData.push(new Promise(function (resolve, reject) {
            bcryptjs_1.default.genSalt(10, function (err, salt) {
                bcryptjs_1.default.hash(v, salt, function (err, hash) {
                    resolve({ [k]: hash });
                });
            });
        }));
    });
    return Promise.all(promisedData);
};
exports.useHashData = useHashData;
