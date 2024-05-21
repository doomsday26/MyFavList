"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        let uri = process.env.DEPL_TYPE == 'dev' ? config_1.default.MONGO_URL : `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongo:27017/${process.env.MONGO_INITDB_DATABASE}?authSource=admin`;
        console.log("uri>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", { uri });
        try {
            const con = yield mongoose_1.default.connect(uri, {
                serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
                socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
                // useNewUrlParser: true,
                // useUnifiedTopology: true,
            });
            console.log("connected database ");
            return con;
        }
        catch (err) {
            console.log(err);
            process.exit(1);
        }
    });
}
exports.connectDB = connectDB;
