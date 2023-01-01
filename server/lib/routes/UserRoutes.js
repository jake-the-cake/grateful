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
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserModel_1 = require("../models/UserModel");
const responseHandlers_1 = require("../handlers/responseHandlers");
const validationHandlers_1 = require("../handlers/validationHandlers");
const runValidation_1 = require("../validators/runValidation");
const router = express_1.default.Router();
exports.UserRouter = router;
router.get('/', (req, res) => {
    res.send('User Routes');
});
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const responseObject = (0, responseHandlers_1.createResponseObject)();
    // validation engine
    yield (0, runValidation_1.runValidation)((0, validationHandlers_1.createValidationObject)(responseObject, req.body), {
        required: ['email', 'password'],
        unique: { model: UserModel_1.UserModel, fields: ['email'] }
    });
    if (responseObject.errors.length === 0) {
        const { email, password } = req.body;
        responseObject.data = new UserModel_1.UserModel({ email, password });
        (0, responseHandlers_1.setSuccessResponse)(responseObject, 201);
        // responseObject.data.save()
    }
    res.status(responseObject.statusCode).json(responseObject);
}));
