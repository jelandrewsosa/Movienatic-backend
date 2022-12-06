import UserMovie from "../../models/UserMovie.js"

export default async function CheckIfUserMovieExist(req, res, next) {

  const {userMovieId} = req.params;
  const findUserMovie = await UserMovie.findOne({ _id: userMovieId });

  if (!findUserMovie) {

    return res.status(422).json({
      error: "Movie doesn't exist in your collection",
    });
  }
  next();
}