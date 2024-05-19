"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentType = exports.GenreType = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// type Genre = 'Action' | 'Comedy' | 'Drama' | 'Fantasy' | 'Horror' | 'Romance' | 'SciFi';
var GenreType;
(function (GenreType) {
    GenreType["ACTION"] = "Action";
    GenreType["COMEDY"] = "Comedy";
    GenreType["DRAMA"] = "Drama";
    GenreType["FANTASY"] = "Fantasy";
    GenreType["HORROR"] = "Horror";
    GenreType["ROMANCE"] = "Romance";
    GenreType["SCIFI"] = "SciFi";
})(GenreType || (exports.GenreType = GenreType = {}));
var ContentType;
(function (ContentType) {
    ContentType["MOVIE"] = "Movie";
    ContentType["TV_SHOW"] = "TVShow";
})(ContentType || (exports.ContentType = ContentType = {}));
const episodeSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    releaseDate: {
        type: Date,
        required: true,
    },
});
const contentSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    genres: {
        type: Object.values(GenreType),
        required: true,
    },
    contentType: Object.values(ContentType),
    releaseDate: {
        type: Date,
        required: true,
    },
    episodes: { type: [episodeSchema] },
    director: { type: [String] },
    actors: { type: [String] },
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Content', contentSchema);
