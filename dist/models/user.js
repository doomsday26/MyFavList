"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../utils/config"));
const watchHistoryItem = new mongoose_1.default.Schema({
    contentId: {
        type: String
    },
    contentType: {
        type: String
    },
    watchedOn: {
        type: Date
    },
    rating: {
        type: Number
    }
});
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: [true, "Please provide your username"],
        trim: true,
        maxLength: 40,
    },
    email: {
        type: String,
        required: true,
    },
    googleId: {
        type: String
    },
    img: {
        link: {
            type: String,
        },
        source: {
            type: String,
        },
    },
    password: {
        type: String,
        minLength: config_1.default.PASSWORD_MIN_LENGTH,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    preferences: {
        favoriteGenres: {
            type: [String],
            default: []
        },
        dislikedGenres: {
            type: [String],
            default: []
        }
    },
    watchHistory: {
        type: [watchHistoryItem],
        default: []
    },
    myWatchList: {
        type: [mongoose_1.default.SchemaTypes.ObjectId],
        default: []
    }
}, { timestamps: true });
userSchema.index({ email: 1 });
exports.default = mongoose_1.default.model('User', userSchema);
