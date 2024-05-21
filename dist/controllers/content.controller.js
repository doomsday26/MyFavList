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
exports.createDummyContent = exports.createContent = exports.getContent = void 0;
const content_service_1 = __importDefault(require("../services/content.service"));
const dummyContent_1 = require("../utils/dummyContent");
const getContent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.user);
    let contentDetails = yield content_service_1.default.getAllContent();
    res.status(200).json(contentDetails);
    // next(contentDetails)
});
exports.getContent = getContent;
const createContent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body);
    const { title, contentType, description, genres, releaseDate, episodes, director, actors } = req.body;
    const content = { title, contentType, description, genres, releaseDate, episodes, director, actors };
    let contentDetails = yield content_service_1.default.createContent(content);
    next(contentDetails);
});
exports.createContent = createContent;
const createDummyContent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let contentData = dummyContent_1.data;
        let arr = [];
        for (let i = 0; i < contentData.length; i++) {
            arr.push(content_service_1.default.createContent(contentData[i]));
        }
        yield Promise.all(arr).then(data => { console.log(data.length); });
        res.status(200).json({ msg: 'dummy content created' });
        return;
    }
    catch (error) {
        console.log(error);
    }
});
exports.createDummyContent = createDummyContent;
