"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverNameInit = void 0;
const serverNameInit = () => {
    return process.env.SERVER_NAME || 'Nameless Server';
};
exports.serverNameInit = serverNameInit;
