"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogDataInJSONFromReqObject = exports.getLogDataFromReqObject = void 0;
const development_1 = __importDefault(require("./development")); // Assuming this is a custom logger module
// Logger instance
const logger = development_1.default;
// Function to get log data as a string from the request object
const getLogDataFromReqObject = (req) => {
    var _a, _b;
    try {
        if (!req)
            return '(request object data Not Found)';
        const ip = ((_a = req.headers) === null || _a === void 0 ? void 0 : _a['x-forwarded-for']) || req.ip || req.socket.remoteAddress;
        const userId = (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id; // TypeScript does not recognize `user` by default
        const path = req.path;
        const params = JSON.stringify(req.params);
        const query = JSON.stringify(req.query);
        const body = Object.assign({}, req.body);
        delete body.password; // Sensitive data which should not be logged
        delete body.confirmPassword; // Sensitive data which should not be logged
        delete body.token; // Sensitive data which should not be logged
        delete body['g-recaptcha-response']; // Not needed
        return `IP - ${ip}, UserId - ${userId}, Path - ${path}, Body - ${JSON.stringify(body)}, Params - ${params}, Query - ${query}`;
    }
    catch (error) {
        logger.error(`getLogDataFromReqObject function error - ${error}`);
        return '(request object data Not Found)';
    }
};
exports.getLogDataFromReqObject = getLogDataFromReqObject;
// Function to get log data as a JSON object from the request object
const getLogDataInJSONFromReqObject = (req) => {
    var _a, _b;
    try {
        const ip = ((_a = req.headers) === null || _a === void 0 ? void 0 : _a['x-forwarded-for']) || req.ip || req.socket.remoteAddress;
        const userId = (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id; // TypeScript does not recognize `user` by default
        const path = req.path;
        const params = JSON.stringify(req.params);
        const query = JSON.stringify(req.query);
        const method = req.method;
        const body = Object.assign({}, req.body);
        delete body.password; // Sensitive data which should not be logged
        delete body.confirmPassword; // Sensitive data which should not be logged
        delete body.token; // Sensitive data which should not be logged
        delete body['g-recaptcha-response']; // Not needed
        return {
            ip: ip,
            userId: userId,
            path,
            body: JSON.stringify(body),
            params,
            query,
            method
        };
    }
    catch (error) {
        throw new Error(`getLogDataInJSONFromReqObject function error - ${error}`);
    }
};
exports.getLogDataInJSONFromReqObject = getLogDataInJSONFromReqObject;
exports.default = logger;
