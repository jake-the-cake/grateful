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
const useEcryption_1 = require("../hooks/useEcryption");
const useToken_1 = require("../hooks/useToken");
const router = express_1.default.Router();
exports.AuthRouter = router;
router.get('/test', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedData = yield (0, useEcryption_1.useHashData)(req.body);
    res.json(hashedData);
}));
router.route('/')
    .get((req, res) => res.status(200).send('Auth routes'))
    .all((req, res) => res.status(403).json((0, errorLogHandlers_1.createErrorLog)('x')));
router.post('/login/init', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const responseObject = (0, responseHandlers_1.createResponseObject)();
    const user = yield UserModel_1.UserModel.find({ email: req.body.email });
    if (user.length > 0) {
        const u = user[0];
        if (req.body.password === u.password) {
            const accessToken = (0, useToken_1.useSignedToken)({ id: u._id }, 'access');
            const refreshToken = (0, useToken_1.useSignedToken)({ id: u._id }, 'refresh');
            (0, responseHandlers_1.setSuccessResponse)(responseObject, 201);
            responseObject.data = Object.assign(Object.assign({}, user[0]._doc), { accessToken });
        }
        else {
            responseObject.statusCode = 401;
            responseObject.errors.push((0, errorLogHandlers_1.createErrorLog)('badpw'));
            responseObject.data = null;
        }
    }
    else {
        responseObject.statusCode = 404;
        responseObject.error = (0, errorLogHandlers_1.createErrorLog)('404user');
        responseObject.data = null;
    }
    res.status(responseObject.statusCode).json(responseObject);
}));
router.post('/login/test', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const responseObject = (0, responseHandlers_1.createResponseObject)();
        const allUsers = yield UserModel_1.UserModel.find();
        const foundUser = yield allUsers.filter(user => {
            console.log(user);
            return [];
        });
        console.log(foundUser);
        // if ( user.length > 0 ) {
        //   const u = user[ 0 ]
        //   if ( req.body.password === u.password ) {
        //     const accessToken = useSignedToken({ id: u._id }, 'access' )
        //     const refreshToken = useSignedToken({ id: u._id }, 'refresh' )
        //     setSuccessResponse( responseObject, 201 )
        //     responseObject.data = { ...user[ 0 ]._doc, accessToken }
        //   }
        //   else {
        //     responseObject.statusCode = 401
        //     responseObject.errors.push( createErrorLog( 'badpw' ))
        //     responseObject.data = null
        //   }
        // }
        // else { 
        //   responseObject.statusCode = 404
        //   responseObject.error = createErrorLog( '404user' )
        //   responseObject.data = null
        // }
        res.status(responseObject.statusCode).json([allUsers, foundUser]);
    });
});
