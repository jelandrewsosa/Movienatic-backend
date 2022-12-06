import User from "../../models/User.js"

export default async function CheckIfUserExist(req, res, next) {

  const id = req.header("X-User-ID");
  const findUser = await User.findOne({ _id: id });

  if (!findUser) {

    return res.status(422).json({
      error: "User doesn't Exist",
    });
  }
  next();
}