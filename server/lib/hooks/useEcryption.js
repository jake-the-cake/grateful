"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCompareHash = exports.useHashData = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const errorLogHandlers_1 = require("../handlers/errorLogHandlers");
const useHashData = (data) => {
    if (typeof data !== 'object')
        return (0, errorLogHandlers_1.createErrorLog)('badobj');
    const promisedData = [];
    Object.entries(data).forEach(([k, v]) => {
        promisedData.push(new Promise(function (resolve, reject) {
            bcryptjs_1.default.genSalt(10, function (err, salt) {
                bcryptjs_1.default.hash(v, salt, function (err, hash) {
                    resolve({ [k]: hash });
                });
            });
        }));
    });
    return Promise.all(promisedData);
};
exports.useHashData = useHashData;
const useCompareHash = (submittedPassword, storedPassword) => {
    bcryptjs_1.default.compare(submittedPassword, storedPassword, function (err, res) {
        if (err)
            return err.message;
        return res;
    });
};
exports.useCompareHash = useCompareHash;
// //Checking the crypto module
// const crypto = require('crypto');
// const algorithm = 'aes-256-cbc'; //Using AES encryption
// const key = crypto.randomBytes(32);
// const iv = crypto.randomBytes(16);
// //Encrypting text
// function encrypt(text: string) {
//    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
//    let encrypted = cipher.update(text);
//    encrypted = Buffer.concat([encrypted, cipher.final()]);
//    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
// }
// // Decrypting text
// function decrypt(text: string) {
//    let iv = Buffer.from(text.iv, 'hex');
//    let encryptedText = Buffer.from(text.encryptedData, 'hex');
//    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
//    let decrypted = decipher.update(encryptedText);
//    decrypted = Buffer.concat([decrypted, decipher.final()]);
//    return decrypted.toString();
// }
// // Text send to encrypt function
// var hw = encrypt("Welcome to Tutorials Point...")
// console.log(hw)
// console.log(decrypt(hw))
