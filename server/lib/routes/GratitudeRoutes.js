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
const errorLogHandlers_1 = require("../handlers/errorLogHandlers");
const router = express_1.default.Router();
exports.GratitudeRouter = router;
const models = {
    gratitude: GratitudeModel_1.GratitudeModel
};
const getDataByUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const routePath = req.baseUrl.replace('/', '');
    const userId = req.body.id;
    req.data = yield models[routePath].find({ user: userId });
    next();
    // console.log( data )
    // res.send( 'check terminal' )
});
router.route('/find/byuser')
    .get(getDataByUser, (req, res) => {
    res.send(req.data);
});
router.get('/', (req, res) => {
    res.send('Gratitude Routes');
});
router.get('/find/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield GratitudeModel_1.GratitudeModel.find();
    res.status(200).json(response);
}));
router.delete('/delete/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    Array.from(yield GratitudeModel_1.GratitudeModel.find()).forEach(user => {
        user.delete();
    });
    res.status(201).json({ "all grats": "deleted." });
}));
router.post('/add', (req, res) => {
    const responseObject = (0, responseHandlers_1.createResponseObject)();
    (0, runValidation_1.runValidation)((0, validationHandlers_1.createValidationObject)(responseObject, req.body), {
        required: ['user']
    });
    if (responseObject.errors.length === 0) {
        try {
            const { user, note } = req.body;
            responseObject.data = new GratitudeModel_1.GratitudeModel({ user, note, votes: 0, reports: 0 });
            (0, responseHandlers_1.setSuccessResponse)(responseObject, 201);
            responseObject.data.save();
        }
        catch (err) {
            console.error(err.message);
            responseObject.errors.push((0, errorLogHandlers_1.createErrorLog)('server'));
        }
    }
    res.status(responseObject.statusCode).json(responseObject);
});
// admin only routes
router.route('/find/all');
