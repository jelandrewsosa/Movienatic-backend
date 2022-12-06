import Movie from "../../models/Movie.js"

export default async function CheckIfMovieExist(req, res, next) {

  const {title} = req.body;
  const findMovie = await Movie.findOne({ title: title });

  if (findMovie) {

    return res.status(422).json({
      error: "Movie already Exist",
    });
  }
  next();
}