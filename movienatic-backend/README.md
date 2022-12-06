# Movienatic

# Description
Movienatic is a Movie Organizer wherein you can search and add your watched movie into your Watched Movies Collection, You can also input some Reviews and add a Movie Rating after adding it to your Watched Movies Collection.

## Installation

- npm i -D nodemon or npx i -D nodemon
- npm i dotenv --save
- npm i express
- npm i mongoose
- npm i cors
- npm i helmet
- postman/insomnia for a client tester
- mongoDB for database

## Usage

#To Run MongodB Server
- Connect To
-- mongodb://localhost:27017

#To Run from Client
- Input to Path Field
-- http://localhost:8888/

#To run from Visual Studio Code
- Go to p4-node-app by cd p4-node-app
-- input nodemon .


#To Create a new User
- Input to Path - http://localhost:8888/user
- Set Client to POST
- Input this sample in Client field Body
{
  "firstName": "Sample Name",
  "lastName": "Sample lastName",
  "email": "test1@sample.com",
  "password": "Sample123"
}

#To Update an Existing User
- Input to Path - http://localhost:8888/user
- Set Client to PATCH
- Input this sample in Client field Body
{
  "firstName": "Update Name",
  "lastName": "Update lastName",
  "email": "update1@sample.com",
  "password": "Update123"
}

#To Add a movie to your Watched Movie Collection
- Input to Path - http://localhost:8888/user/:movieId
- Set Client to POST
- Input the user id to the Header
-- X-USER-ID - 6373db505b4e835207e63473
- Input this sample in Client field Body
{
  "userReview": "My Saving Private Ryan Review, it was awesome",
  "userRating": 5
}

#To Find a Movie
- Input to Path - http://localhost:8888/movie/:movieId
- Set Client to GET
- Input the movie id to the Header
-- X-Movie-ID - 63765a46d28328d02c80e7f6

#To Find all Movies
- Input to Path - http://localhost:8888/movies
- Set Client to GET
- Note, you can also pass a limit and offset to params to filter

#To get all User Watched Movies Collection
- Input to Path - http://localhost:8888/usermovies
- Set Client to GET
- Input the user id to the Header
-- X-USER-ID - 6373db505b4e835207e63473
- Note, you can also pass a limit and offset to params to filter

#To Delete an Existing Watched Movie from the User Watched Movie Collection
- Input to Path - http://localhost:8888/user/usermovie/:userMovieId
- Input the  User Movie Id to the Header at the path
-- http://localhost:8888/user/usermovie/

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

no lecense yet