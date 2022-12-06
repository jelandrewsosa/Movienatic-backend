import User from "../../models/User.js"

export default async function RegisterEmailValidator(req, res, next) {
  const {email} = req.body;
  const findEmail = await User.findOne({ email: email });
  
  if (findEmail) {

    return res.status(422).json({
      error: "Email Address Already Exist",
    });
  }
  next();
}