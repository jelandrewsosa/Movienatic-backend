import mongoose from "mongoose";
import User from "./User.js";
import Movie from "./Movie.js";

const { Schema, model, Types } = mongoose;

const userMovieSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: User},
  movieId: {type: Schema.Types.ObjectId, ref: Movie},
  userReview: {type: String, required: true},
  userRating: {type: Number, required: true},
  dateCreated: { type: Date, default: Date.now },
  deletedAt: {
    type: Date,
    default: null,
  }
});

userMovieSchema.statics.getAllUserMovieByUserId = async function(userId, limit, offset) {
  const pipelines = [
    {
      $match: {
        userId: mongoose.Types.ObjectId(userId),
        deletedAt: {
          $eq: null,
        }
      }
    }
  ];

  // If limit is provided then push to pipelines
  if (limit !== undefined || !isNaN(limit)) {
    pipelines.push({
      $limit: parseInt(limit),
    });
  }
  // IF offset is provided then push to pipelines
  if (offset !== undefined || !isNaN(offset)) {
    pipelines.push({
      $skip: parseInt(offset),
    });
  }

  return await this.aggregate(pipelines);
}

export default model("userMovie", userMovieSchema);
