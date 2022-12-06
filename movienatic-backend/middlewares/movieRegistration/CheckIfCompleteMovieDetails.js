export default async function CheckIfCompleteMovieDetails(req, res, next) {
  const { title, summary, details } = req.body;

  if (
    !title ||
    !summary ||
    !details.production ||
    !details.genres ||
    !details.releaseDate ||
    !details.director ||
    !details.casts
  ) {
    return res.status(422).json({
      error: "Please Complete all the details",
    });
  }
  next();
}
