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
const content_repository_1 = __importDefault(require("../repository/content.repository"));
const console_1 = require("console");
class UserService {
    constructor(ContentRepository) {
        this.ContentRepository = ContentRepository;
    }
    getAllContent() {
        return __awaiter(this, void 0, void 0, function* () {
            let content = yield this.ContentRepository.getAll();
            // console.log({content})
            if (!content.length) {
                throw (0, console_1.error)('content not found');
            }
            return content;
        });
    }
    ;
    // async updateContent(userProfileDetails:IUpdateUSerDetails){
    //    const {username,email,password,img,phoneNumber}= userProfileDetails;
    //    return this.UserRepository.updateUserProfile(userProfileDetails);
    // };
    createContent(contentDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ContentRepository.createContent(contentDetails);
        });
    }
}
exports.UserService = UserService;
exports.default = new UserService(new content_repository_1.default());
