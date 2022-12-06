import Movie from "../../models/Movie.js"

export default async function MovieChecker(req, res, next) {

  const movieId = req.params.movieId;

  const findMovie = await Movie.findOne({movieId: movieId});
  
  if (!findMovie) {

    return res.status(422).json({
      error: "Movie doesn't Exist",
    });
  }
  next();
}