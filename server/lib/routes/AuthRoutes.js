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
exports.AuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserModel_1 = require("../models/UserModel");
const responseHandlers_1 = require("../handlers/responseHandlers");
const errorLogHandlers_1 = require("../handlers/errorLogHandlers");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const useEcryption_1 = require("../hooks/useEcryption");
const router = express_1.default.Router();
exports.AuthRouter = router;
(0, useEcryption_1.useHashData)({ data: 'data', more: 'more data' }).then((x) => console.log(x));
router.route('/')
    .get((req, res) => res.status(200).send('Auth routes'))
    .all((req, res) => res.status(403).json((0, errorLogHandlers_1.createErrorLog)('x')));
router.post('/login/init', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const responseObject = (0, responseHandlers_1.createResponseObject)();
    const user = yield UserModel_1.UserModel.find({ email: req.body.email });
    if (user.length > 0) {
        const accessToken = jsonwebtoken_1.default.sign({ id: user[0]._id }, process.env.ACCESS_HUSH, { expiresIn: 10000 });
        const refreshToken = jsonwebtoken_1.default.sign({ id: user[0]._id }, process.env.REFRESH_HUSH, { expiresIn: 60000 });
        responseObject.statusCode = 201;
        responseObject.success = true;
        responseObject.data = Object.assign(Object.assign({}, user[0]._doc), { accessToken });
        responseObject.errors = null;
        console.log(responseObject);
    }
    else {
        responseObject.statusCode = 404;
        responseObject.error = (0, errorLogHandlers_1.createErrorLog)('404user');
        responseObject.data = null;
    }
    res.status(responseObject.statusCode).json(responseObject);
}));
