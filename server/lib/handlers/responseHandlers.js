"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setErrorResponse = exports.setSuccessResponse = exports.createResponseObject = void 0;
const createResponseObject = () => {
    return {
        statusCode: 500,
        success: false,
        data: null,
        errors: []
    };
};
exports.createResponseObject = createResponseObject;
const setSuccessResponse = (object, code) => {
    object.statusCode = code;
    object.success = true;
    object.errors = null;
    return object;
};
exports.setSuccessResponse = setSuccessResponse;
const setErrorResponse = (object, code) => {
    object.data = null;
    object.success = false;
    object.statusCode = code;
    return object;
};
exports.setErrorResponse = setErrorResponse;
