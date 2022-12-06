import mongoose from 'mongoose';

const {Schema, model} = mongoose;

const moviesSchema = new Schema({
  title: {type: String, required: true},
  summary: {type: String, required: true},
  details: {
    production: {type: String, required: true},
    genres: {type: [], required: true},
    releaseDate: {type: Number, required: true},
    director: {type: String, required: true},
    casts: {type: [], required: true}
  },
  dateCreated: { type: Date, default: Date.now },
  deletedAt: {
    type: Date,
    default: null,
  }
})

moviesSchema.statics.getAllMovies = async function (limit, offset) {
  const pipelines = [
    {
      $match: {
        deletedAt: {
          $eq: null,
      }
    }},
    {
      $sort: {
        "details.releaseDate": -1} 
    }
  ];

  // If limit is provided then push to pipelines
  if (limit !== undefined || !isNaN(limit)) {
    pipelines.push({
      $limit: parseInt(limit) || 30,
    });
  }
  // IF offset is provided then push to pipelines
  if (offset !== undefined || !isNaN(offset)) {
    pipelines.push({
      $skip: parseInt(offset) || 0,
    });
  }

  return await this.aggregate(pipelines);
};

export default model('Movie', moviesSchema);