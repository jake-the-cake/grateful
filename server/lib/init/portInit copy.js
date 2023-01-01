"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.portInit = void 0;
const portInit = () => {
    return process.env.PORT || 4200;
};
exports.portInit = portInit;
