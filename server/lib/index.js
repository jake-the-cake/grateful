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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponseObject = exports.createErrorLog = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const GratefulModel_1 = require("./models/GratefulModel");
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
var ErrorTypes;
(function (ErrorTypes) {
    ErrorTypes["Required"] = "Required";
    ErrorTypes["Default"] = "DefaultErrorMessage";
})(ErrorTypes || (ErrorTypes = {}));
const createErrorLog = (errorCode) => {
    switch (errorCode) {
        case 'nouser':
            return {
                type: ErrorTypes.Required,
                message: 'A -user- ID was not provided.'
            };
        case 'nonote':
            return {
                type: ErrorTypes.Required,
                message: 'A -note- was not provided.'
            };
        default:
            return {
                type: ErrorTypes.Default,
                message: 'Some sort of error has occurred.'
            };
    }
};
exports.createErrorLog = createErrorLog;
const createResponseObject = () => {
    return {
        statusCode: 500,
        success: false,
        data: null,
        errors: []
    };
};
exports.createResponseObject = createResponseObject;
app.get('/', (req, res) => {
    res.send('home');
});
app.post('/add', (req, res) => {
    const responseObject = (0, exports.createResponseObject)();
    console.log(req.body);
    switch (req.body.user) {
        case undefined:
            responseObject.errors.push((0, exports.createErrorLog)('nouser'));
            responseObject.statusCode = 401;
            break;
        default:
            break;
    }
    switch (req.body.note) {
        case undefined:
            responseObject.errors.push((0, exports.createErrorLog)('nonote'));
            responseObject.statusCode = 401;
            break;
        default:
            break;
    }
    if (responseObject.errors.length === 0) {
        responseObject.data = new GratefulModel_1.GratefulModel({
            user: req.body.user,
            note: req.body.note,
            votes: 0,
            reports: 0
        });
        responseObject.statusCode = 201;
        responseObject.success = true;
        responseObject.errors = null;
        responseObject.data.save();
    }
    res.status(responseObject.statusCode).json(responseObject);
});
app.get('/view', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const grats = yield GratefulModel_1.GratefulModel.find();
    res.json(grats);
}));
app.listen(4200, () => {
    console.log('running');
    mongoose_1.default.set('strictQuery', false);
    mongoose_1.default.connect('mongodb://localhost:27017/grateful', () => {
        console.log('data');
    });
});
