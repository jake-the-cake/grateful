"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const UserRoutes_1 = require("./routes/UserRoutes");
const GratitudeRoutes_1 = require("./routes/GratitudeRoutes");
const IndexRoutes_1 = require("./routes/IndexRoutes");
const runInits_1 = require("./init/runInits");
// init and configure app
const app = (0, express_1.default)();
dotenv_1.default.config();
const { port, serverName } = (0, runInits_1.runInits)();
// middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// router
app.use('/', IndexRoutes_1.IndexRouter);
app.use('/user', UserRoutes_1.UserRouter);
app.use('/gratitude', GratitudeRoutes_1.GratitudeRouter);
// listener
app.listen(port, () => {
    console.log(`'${serverName}' server is running on port ${port}.`);
    mongoose_1.default.set('strictQuery', false);
    mongoose_1.default.connect(process.env.MONGO, () => {
        console.log('data');
    });
});
