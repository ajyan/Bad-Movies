//

const mongoose = require('mongoose');
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect('mongodb://localhost:27017/badmovies', {
    useNewUrlParser: true
  });
}

const db = mongoose.connection;

// create the schema
const movieSchema = mongoose.Schema({
  id: Number,
  original_title: String,
  genres: Array,
  vote_average: Number,
  release_date: String,
  poster_path: String
});

const genreSchema = mongoose.Schema({
  id: Number,
  name: String
});

// hook up the model to the schema
const Movie = mongoose.model('Movie', movieSchema);
const Genre = mongoose.model('Genre', genreSchema);

// save entries
var saveMovies = movie => {
  // return an array of promises
  return Movie.findOneAndUpdate(
    { id: movie.id },
    {
      id: movie.id,
      original_title: movie.original_title,
      genres: movie.genres,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
      poster_path: movie.poster_path
    },
    { upsert: true }
  ).exec(data => {
    console.log('Movies saved with >>>>>>', data);
    return data;
  });
};

var getFaves = () => {
  return Movie.find({});
};

// get favorites

// deletes an entry from favorites
var removeMovies = movie => {
  Movie.findOneAndDelete({ id: movie.id }).exec();
};
// retrieve entries

mongoose.Promise = Promise;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to db...');
});

module.exports = {
  db,
  saveMovies,
  removeMovies,
  getFaves
};
