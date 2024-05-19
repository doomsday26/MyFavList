import mongoose from "mongoose";
// type Genre = 'Action' | 'Comedy' | 'Drama' | 'Fantasy' | 'Horror' | 'Romance' | 'SciFi';
export enum GenreType {
  ACTION = 'Action',
  COMEDY = 'Comedy',
  DRAMA = 'Drama',
  FANTASY = 'Fantasy',
  HORROR = 'Horror',
  ROMANCE = 'Romance',
  SCIFI = 'SciFi',
}
export enum ContentType{
  MOVIE = 'Movie',
  TV_SHOW = 'TVShow',
}
const episodeSchema= new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  releaseDate: {
    type: Date,
    required: true,
  },
});

const contentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genres: {
    type: Object.values(GenreType),
    required: true,
  },
  contentType:Object.values(ContentType),
  releaseDate: {
    type: Date,
    required: true,
  },
  episodes:{type:[episodeSchema]},
  director: {type:[String]},
  actors: {type:[String]},
},{
  timestamps:true
});

export interface IEpisode {
    title: string;
    description: string;
    releaseDate: String;
  }
  
  // Content interface
 export interface IContent {
    title: string;
    contentType:'Movie'|'TVShow'
    description: string;
    genres: string[];
    releaseDate: string;
    episodes: IEpisode[];
    director: string[];
    actors: string[];
  }

export default mongoose.model<IContent>('Content', contentSchema);