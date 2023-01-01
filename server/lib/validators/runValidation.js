"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runValidation = void 0;
const submissionValidators_1 = require("./submissionValidators");
const runValidation = (objects, data) => {
    const checks = new Promise((resolve, reject) => {
        if (data.unique)
            resolve((0, submissionValidators_1.checkForExisting)(objects, data.unique));
        else
            resolve(true);
    });
    if (data.required)
        (0, submissionValidators_1.checkForEmptyFields)(objects, data.required);
    return checks;
};
exports.runValidation = runValidation;
