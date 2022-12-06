import UserMovie from "../../models/UserMovie.js"

export default async function AddMovieToCollectionValidator(req, res, next) {

  const {movieId} = req.params;
  const {userId} = req.params;
  const findMovie = await UserMovie.findOne({userId: userId, movieId: movieId, deletedAt: null });
  
  if (findMovie) {

    return res.status(422).json({
      error: 'You already added this movie to your watched movie collection',
    });
  }
  next();
}