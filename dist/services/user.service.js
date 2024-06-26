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
exports.UserService = void 0;
const mongoose_1 = require("mongoose");
const user_repository_1 = __importDefault(require("../repository/user.repository"));
class UserService {
    constructor(UserRepository) {
        this.UserRepository = UserRepository;
    }
    getuserDetails(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.UserRepository.getUserById(new mongoose_1.Types.ObjectId(userId));
        });
    }
    ;
    updateUserDetails(userProfileDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password, img, phoneNumber } = userProfileDetails;
            return this.UserRepository.updateUserProfile(userProfileDetails);
        });
    }
    ;
    createUser(userDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.UserRepository.createUser(userDetails);
        });
    }
}
exports.UserService = UserService;
exports.default = new UserService(new user_repository_1.default());
