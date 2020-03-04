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

var saveGenres = genres => {
  let promisedGenres = genres.map(genre => {
    // return an array of promises
    return Genre.findOneAndUpdate(
      { id: genre.id },
      {
        id: genre.id,
        name: genre.name
      },
      { upsert: true }
    ).exec();
  });

  Promise.all(promisedGenres).then(data => {
    console.log('Movies saved with >>>>>>', data);
    return data;
  });
};
// save entries
var saveMovies = movies => {
  let promisedMovies = movies.map(movie => {
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
    ).exec();
  });

  Promise.all(promisedMovies).then(data => {
    console.log('Movies saved with >>>>>>', data);
    return data;
  });
};
// save genres

// save favorites

// get favorites

// deletes an entry from favorites

// retrieve entries

// get movies by genre

// get movies by worst rating

mongoose.Promise = Promise;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to db...');
});

module.exports.db = db;
module.exports.saveGenres = saveGenres;
module.exports.saveMovies = saveMovies;
