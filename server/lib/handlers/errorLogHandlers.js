"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createErrorLog = void 0;
const notProvided_1 = require("./notProvided");
const createErrorLog = (errorCode) => {
    if (errorCode.slice(0, 2) === 'no')
        return (0, notProvided_1.notProvided)(errorCode.replace('no', ''));
    switch (errorCode) {
        case 'server':
            return {
                type: "Internal" /* ErrorTypes.Server */,
                message: 'An internal server error has occured.'
            };
        case 'dupemail':
            return {
                type: "TakenValue" /* ErrorTypes.Duplicate */,
                message: 'Email address in use already'
            };
        default:
            return {
                type: "DefaultErrorMessage" /* ErrorTypes.Default */,
                message: 'Some sort of error has occurred.'
            };
    }
};
exports.createErrorLog = createErrorLog;
