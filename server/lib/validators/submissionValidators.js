"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkForExisting = exports.checkForEmptyFields = void 0;
const errorLogHandlers_1 = require("../handlers/errorLogHandlers");
const checkForEmptyFields = ({ response, request }, checks) => {
    if (response.errors === null)
        response.errors = [];
    checks.forEach(check => {
        switch (request[check]) {
            case undefined:
                response.errors.push((0, errorLogHandlers_1.createErrorLog)(`no${check}`));
                response.statusCode = 401;
                break;
            default:
                break;
        }
    });
};
exports.checkForEmptyFields = checkForEmptyFields;
const checkForExisting = ({ response, request }, { model, fields }) => {
    const check = new Promise((resolve, reject) => {
        fields.forEach((field) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const query = yield model.find({ [field]: request[field] });
            if (query.length > 0) {
                response.statusCode = 403;
                resolve((_a = response.errors) === null || _a === void 0 ? void 0 : _a.push((0, errorLogHandlers_1.createErrorLog)(`dup${field}`)));
            }
            else
                resolve(true);
        }));
    });
    return check;
};
exports.checkForExisting = checkForExisting;
