"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHashData = void 0;
const useHashData = (data) => {
    return new Promise(function (resolve, reject) {
        if (typeof data !== 'object') {
            reject('Must send an object.');
        }
        else {
            const hashedObject = {};
            Object.entries(data).forEach(item => {
                resolve(hashedObject);
            });
        }
    });
};
exports.useHashData = useHashData;
