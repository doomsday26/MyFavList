"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./utils/db");
const config_1 = __importDefault(require("./utils/config"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const userListItem_route_1 = __importDefault(require("./routes/userListItem.route"));
const content_route_1 = __importDefault(require("./routes/content.route"));
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger_output.json');
(0, db_1.connectDB)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/user', user_route_1.default);
app.use('/listItem', userListItem_route_1.default);
app.use('/content', content_route_1.default);
app.get('/health', (req, res, next) => {
    res.status(200).json({ status: 'ok' });
});
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.listen(config_1.default.PORT || 3000, () => {
    console.log("server started on port", config_1.default.PORT);
    //  console.log(`${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongo:27017/${process.env.MONGO_INITDB_DATABASE}?authSource=admin`)
});
exports.default = app;
