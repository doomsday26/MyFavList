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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JEST_TIMEOUT = exports.closeDatabase = exports.connectMemoryDB = void 0;
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
let mongoServer;
// (async () => {
//     mongoServer = await MongoMemoryServer.create();
//     const mongoUri = mongoServer.getUri();
//     await mongoose.connect(mongoUri, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     });
// })();
const connectMemoryDB = () => __awaiter(void 0, void 0, void 0, function* () {
    mongoServer = yield MongoMemoryServer.create();
    yield mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, dbName: 'verifyMASTER', useUnifiedTopology: true });
});
exports.connectMemoryDB = connectMemoryDB;
const closeDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose.connection.dropDatabase();
    yield mongoose.connection.close();
    yield mongoServer.stop();
});
exports.closeDatabase = closeDatabase;
exports.JEST_TIMEOUT = 36000;
