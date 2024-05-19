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
const user_1 = __importDefault(require("../models/user"));
class UserRepository {
    constructor() {
        this._model = user_1.default;
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this._model.findById(userId);
            return user;
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this._model.findOne({ email });
            return user;
        });
    }
    createUser(userDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = yield this._model.create(userDetails);
            return newUser;
        });
    }
    updateUserProfile(userDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, username, email, password, img } = userDetails;
            return this._model.findOneAndUpdate({ _id: userId }, {
                $set: {
                    username,
                    email,
                    password,
                    img,
                }
            }, { new: true, omitUndefined: true, runValidators: true });
        });
    }
}
exports.default = UserRepository;
