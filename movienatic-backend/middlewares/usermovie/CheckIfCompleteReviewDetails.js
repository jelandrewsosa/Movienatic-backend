export default async function CheckIfCompleteReviewDetails(req, res, next) {
  const { userReview, userRating } = req.body;

  if (
    !userReview ||
    !userRating 
  ) {
    return res.status(422).json({
      error: "Please Complete all the details",
    });
  }
  next();
}