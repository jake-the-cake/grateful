"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSuccessResponse = exports.createResponseObject = void 0;
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
