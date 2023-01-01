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
exports.GratitudeRouter = void 0;
const express_1 = __importDefault(require("express"));
const validationHandlers_1 = require("../handlers/validationHandlers");
const runValidation_1 = require("../validators/runValidation");
const responseHandlers_1 = require("../handlers/responseHandlers");
const GratitudeModel_1 = require("../models/GratitudeModel");
const router = express_1.default.Router();
exports.GratitudeRouter = router;
router.get('/', (req, res) => {
    res.send('Gratitude Routes');
});
router.post('/add', (req, res) => {
    const responseObject = (0, responseHandlers_1.createResponseObject)();
    (0, runValidation_1.runValidation)((0, validationHandlers_1.createValidationObject)(responseObject, req.body), {
        required: ['note', 'user']
    });
    if (responseObject.errors.length === 0) {
        const { user, note } = req.body;
        responseObject.data = new GratitudeModel_1.GratitudeModel({ user, note, votes: 0, reports: 0 });
        (0, responseHandlers_1.setSuccessResponse)(responseObject, 201);
        responseObject.data.save();
        // responseObject.errors.push( createErrorLog( 'server' ))
    }
    res.status(responseObject.statusCode).json(responseObject);
});
router.get('/view', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const grats = yield GratitudeModel_1.GratitudeModel.find();
    res.json(grats);
}));
