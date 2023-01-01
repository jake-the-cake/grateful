"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkForEmptyFields = void 0;
const errorLogHandlers_1 = require("../handlers/errorLogHandlers");
const checkForEmptyFields = (object, request, checks) => {
    if (object.errors === null)
        object.errors = [];
    checks.forEach(check => {
        switch (request[check]) {
            case undefined:
                object.errors.push((0, errorLogHandlers_1.createErrorLog)(`no${check}`));
                object.statusCode = 401;
                break;
            default:
                break;
        }
    });
};
exports.checkForEmptyFields = checkForEmptyFields;
