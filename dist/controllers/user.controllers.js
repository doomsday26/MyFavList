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
exports.createUser = exports.getUserDetails = void 0;
const user_service_1 = __importDefault(require("../services/user.service"));
const getUserDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = String((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id);
    let userDetails = yield user_service_1.default.getuserDetails(userId);
    next(userDetails);
});
exports.getUserDetails = getUserDetails;
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body);
    const { username, email, img, googleId, phoneNumber, password } = req.body;
    let userDetails = yield user_service_1.default.createUser({ username, email, img, googleId, phoneNumber, password });
    next(userDetails);
});
exports.createUser = createUser;
// export const updateUserDetails= async(req:authenticatedRequest,res:Response,next:NextFunction):Promise<void>=>{
//     const userId = String(req?.user?._id);
//     const { name,email,img,googleId,phoneNumber,password} = req.body
//     let userDetails= await UserService.updateUserDetails({userId,username, email, img, phoneNumber, password})
//     next(userDetails)
// }
