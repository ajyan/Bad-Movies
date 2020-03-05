//Select one db to work with:

//For SQL
// const sqlDb = require('../../db/sql');
//For Mongo
const mongoDb = require('../../db/mongodb');

// add functionality
saveFaves = movie => {
  mongoDb.saveMovies(movie);
  console.log('Movie saved to the database');
};

deleteFaves = movie => {
  mongoDb.removeMovies(movie);
  console.log('Movie removed from the database');
};

getFaves = () => {
  return mongoDb.getFaves();
};

module.exports = {
  saveFaves,
  deleteFaves,
  getFaves
};
