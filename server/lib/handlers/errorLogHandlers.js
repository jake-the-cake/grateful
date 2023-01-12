"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createErrorLog = void 0;
const notProvided_1 = require("./notProvided");
const createErrorLog = (errorCode) => {
    if (errorCode.slice(0, 2) === 'no')
        return (0, notProvided_1.notProvided)(errorCode.replace('no', ''));
    switch (errorCode) {
        case '404user':
            return {
                type: "NotFound" /* ErrorTypes.NotFound */,
                message: 'User not found.'
            };
        case 'server':
            return {
                type: "Internal" /* ErrorTypes.Server */,
                message: 'An internal server error has occured.'
            };
        // TODO
        // 
        case 'dupemail':
            return {
                type: "TakenValue" /* ErrorTypes.Duplicate */,
                message: 'This -email- address is taken.'
            };
        case 'badobj':
            return {
                type: "Syntax" /* ErrorTypes.Syntax */,
                message: 'Invalid object submitted.'
            };
        case 'badpw':
            return {
                type: "Authentication" /* ErrorTypes.Authentication */,
                message: 'Incorrect password.'
            };
        default:
            return {
                type: "DefaultErrorMessage" /* ErrorTypes.Default */,
                message: 'Some sort of error has occurred.'
            };
    }
};
exports.createErrorLog = createErrorLog;
