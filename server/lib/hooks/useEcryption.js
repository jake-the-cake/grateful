"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHashData = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const useHashData = (data) => {
    return new Promise(function (resolve, reject) {
        const hashedObject = {};
        if (typeof data !== 'object') {
            reject('Must send an object.');
        }
        else {
            bcryptjs_1.default.genSalt(10, (err, salt) => {
                if (err)
                    return err;
                Object.entries(data).forEach(item => {
                    console.log(item);
                    bcryptjs_1.default.hash(item[1], salt, (err, hash) => {
                        console.log(hash);
                        if (err)
                            return err;
                        hashedObject[item[0]] = hash;
                    });
                });
                // hashedObject[ item[ 0 ]] = item[ 1 ]
                resolve(hashedObject);
            });
        }
    });
};
exports.useHashData = useHashData;
