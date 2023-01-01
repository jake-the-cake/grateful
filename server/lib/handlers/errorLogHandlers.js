"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createErrorLog = void 0;
const createErrorLog = (errorCode) => {
    switch (errorCode) {
        case 'nouser':
            return {
                type: "Required" /* ErrorTypes.Required */,
                message: 'A -user- ID was not provided.'
            };
        case 'nonote':
            return {
                type: "Required" /* ErrorTypes.Required */,
                message: 'A -note- was not provided.'
            };
        case 'server':
            return {
                type: "Internal" /* ErrorTypes.Server */,
                message: 'An internal server error has occured.'
            };
        default:
            return {
                type: "DefaultErrorMessage" /* ErrorTypes.Default */,
                message: 'Some sort of error has occurred.'
            };
    }
};
exports.createErrorLog = createErrorLog;
