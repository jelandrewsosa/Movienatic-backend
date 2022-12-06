import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import process from "node:process";
import Movie from "./models/Movie.js";
import User from "./models/User.js";
import UserMovie from "./models/UserMovie.js";
import cors from "cors";
import helmet from "helmet";
import RegisterCheckIfCompleteDetails from "./middlewares/userRegistration/RegisterCheckIfCompleteDetails.js";
import RegisterCheckIfValidEmail from "./middlewares/userRegistration/RegisterCheckIfValidEmail.js";
import RegisterEmailValidator from "./middlewares/userRegistration/RegisterEmailValidator.js";
import CheckIfCompleteMovieDetails from "./middlewares/movieRegistration/CheckIfCompleteMovieDetails.js";
import CheckIfMovieExist from "./middlewares/movieRegistration/CheckIfMovieExist.js";
import CheckIfUserExist from "./middlewares/user/CheckIfUserExist.js";
import MovieChecker from "./middlewares/movie/MovieChecker.js";
import AddMovieToCollectionValidator from "./middlewares/usermovie/AddMovieToCollectionValidator.js";
import CheckIfUserMovieExist from "./middlewares/usermovie/CheckIfUserMovieExist.js";
import CheckIfCompleteReviewDetails from "./middlewares/usermovie/CheckIfCompleteReviewDetails.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5173;

app.use(express.json());
app.use(cors());
app.use(helmet());

mongoose.connect(process.env.DB_URI);
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

app.set("port", PORT);

// Create new user
app.post(
  "/user",
  [
    RegisterCheckIfCompleteDetails,
    RegisterCheckIfValidEmail,
    RegisterEmailValidator,
  ],
  async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const importantDetails = {
      firstName,
      lastName,
      email,
      password,
    };

    res.status(201).json(await User.create(importantDetails));
  }
);

// Add a Movie to Watched User Movies Collection
// app.post(
//   "/user/:movieId",
//   [AddMovieToCollectionValidator, CheckIfCompleteReviewDetails],
//   async (req, res) => {
app.post(
  "/user/:movieId/:userId",
  [AddMovieToCollectionValidator, CheckIfCompleteReviewDetails],
  async (req, res) => {
    const { userId } = req.params;
    const { movieId } = req.params;
    const { userReview, userRating } = req.body;

    const saveUserMovie = {
      userId: userId,
      movieId: movieId,
      userReview,
      userRating,
    };

    res.status(201).json(await UserMovie.create(saveUserMovie));
  }
);

// Create new movie
app.post(
  "/movie",
  [CheckIfCompleteMovieDetails, CheckIfMovieExist],
  async (req, res) => {
    const { title, summary, details } = req.body;

    const importantDetails = {
      title,
      summary,
      details,
    };

    res.status(201).json(await Movie.create(importantDetails));
  }
);

// Find Specific User by Id
app.get("/userById", [CheckIfUserExist], async (req, res) => {
  const userId = req.header("X-User-ID");

  res.status(200).json(await User.findOne({ _id: userId }));
});

// Find Specific User by email
app.get("/user", async (req, res) => {
  const email = req.header("email");
  const password = req.header("password");
  res
    .status(200)
    .json(await User.findOne({ email: email, password: password }));
  // res.status(200).json(user._id);
});

// Find all Users
app.get("/users", async (req, res) => {
  res.status(200).json(await User.find());
});

// Get all User Watched Movie
app.get("/usermovies/:id", async (req, res) => {
  // const userId = req.header("X-USER-ID");
  const userId = req.params.id;
  const { limit, offset } = req.query;

  res
    .status(200)
    .json(await UserMovie.getAllUserMovieByUserId(userId, limit, offset));
});

// Find Specific Movie by Id
app.get("/movie/:movieId", [MovieChecker], async (req, res) => {
  const movieId = req.params.movieId;

  res.status(200).json(await Movie.findOne({ _id: movieId }));
});

// Find all Movies or limited movies
app.get("/movies", async (req, res) => {
  const { limit, offset } = req.query;

  // Approach using find in index
  // res.status(200).json(
  //   await Movie.find()
  //     .sort({ "details.releaseDate": -1 })
  //     .limit(limit || 20)
  //     .skip(offset || 0)
  // );

  // Approach using aggregate in index
  // res
  //   .status(200)
  //   .json(
  //     await Movie.aggregate([
  //       { $match: {
  //         deletedAt: {
  //           $eq: null,
  //         }
  //       }},
  //       { $sort: {"details.releaseDate": -1} },
  //       { $limit: parseInt(limit) || 20 },
  //       { $skip: parseInt(offset) || 0 },
  //     ])
  //   );

  res.status(200).json(await Movie.getAllMovies(limit, offset));
});

//Update User Movie
app.patch(
  "/user/:userMovieId",
  async (req, res) => {
    const { userMovieId } = req.params;
    const { userReview, userRating } = req.body;

    const updatedUser = await UserMovie.updateOne(
      {
        _id: userMovieId,
      },
      {
        userReview: userReview,
        userRating: userRating,
        updatedAt: Date.now(),
      }
    );

    res.status(201).json(await UserMovie.findOne({_id: userMovieId}));
  }
);

// Update User
app.patch("/user", [CheckIfUserExist], async (req, res) => {
  const userId = req.header("X-USER-ID");
  const { firstName, lastName, email, password } = req.body;

  const updatedUser = await User.updateOne(
    {
      _id: userId,
    },
    {
      firstName,
      lastName,
      email,
      password,
      updatedAt: Date.now(),
    }
  );

  res.status(200).json(await User.findOne({ _id: userId }));
});

// Delete Movie
// app.delete('/movie/:movieId', async (req, res) => {
//   const {movieId} = req.params;

//   await Movie.updateOne(
//     {
//       _id: movieId
//     },
//     {
//       deletedAt: Date.now(),
//     }
//   )

//   res.status(200).json({
//     message: 'Successfully removed movie from the list',
//   });
// })

// Delete watched movie from watched movies collection
app.delete(
  "/user/usermovie/:userMovieId",
  [CheckIfUserMovieExist],
  async (req, res) => {
    const { userMovieId } = req.params;

    await UserMovie.updateOne(
      {
        _id: userMovieId,
      },
      {
        deletedAt: Date.now(),
      }
    );

    res.status(200).json({
      message: "Successfully removed movie from the watched movie collection",
    });
  }
);

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
