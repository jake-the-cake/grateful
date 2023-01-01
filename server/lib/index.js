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
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/user', UserRoutes_1.UserRouter);
app.use('/gratitude', GratitudeRoutes_1.GratitudeRouter);
app.get('/', (req, res) => {
    res.send('home');
});
app.listen(4200, () => {
    console.log('running');
    mongoose_1.default.set('strictQuery', false);
    mongoose_1.default.connect('mongodb://localhost:27017/grateful', () => {
        console.log('data');
    });
});
