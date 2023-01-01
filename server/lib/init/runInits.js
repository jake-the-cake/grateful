"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runInits = void 0;
const portInit_1 = require("./portInit");
const serverNameInit_1 = require("./serverNameInit");
const runInits = () => {
    return {
        port: (0, portInit_1.portInit)(),
        serverName: (0, serverNameInit_1.serverNameInit)()
    };
};
exports.runInits = runInits;
