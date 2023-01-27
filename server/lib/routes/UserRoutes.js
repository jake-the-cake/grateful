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
const runValidation_1 = require("../validators/runValidation");
const useEcryption_1 = require("../hooks/useEcryption");
const quiggle_1 = require("quiggle");
const router = express_1.default.Router();
exports.UserRouter = router;
router.get('/', (req, res) => {
    res.send('User Routes');
});
router.get('/find/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield UserModel_1.UserModel.find();
    res.status(200).json(response);
}));
router.delete('/delete/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    Array.from(yield UserModel_1.UserModel.find()).forEach(user => {
        user.delete();
    });
    res.status(201).json({ "all users": "deleted." });
}));
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // validation engine
    yield (0, runValidation_1.runValidation)({ response: req.responseObject, request: req.body }, {
        required: ['email', 'password'],
        unique: { model: UserModel_1.UserModel, fields: ['email'] }
    });
    // deconstruct variables
    const { responseObject, body } = req;
    const { email, password } = body;
    console.log(responseObject);
    if (responseObject.errors.length === 0) {
        let dataObject = { email };
        const dataResponse = yield (0, useEcryption_1.useHashData)({ password });
        if (Object.keys(dataResponse).length) {
            dataResponse.forEach((data) => {
                dataObject = Object.assign(Object.assign({}, dataObject), data);
            });
        }
        responseObject.data = new UserModel_1.UserModel(dataObject);
        quiggle_1.goatTail.setDataResponse(responseObject, 201);
        responseObject.data.save();
    }
    res.status(responseObject.statusCode).json(responseObject);
}));
