import mongoose from "mongoose";
import User from "./User";
import Movie from "./Movie";

const { Schema, model, Types } = mongoose;

const postSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: User},
  movieId: {type: Schema.Types.ObjectId, ref: Movie},
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export default model("Post", postSchema);
