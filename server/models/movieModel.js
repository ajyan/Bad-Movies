//Select one db to work with:

//For SQL
// const sqlDb = require('../../db/sql');
//For Mongo
const mongoDb = require('../../db/mongodb');

// add functionality
saveGenres = genres => {
  mongoDb.saveGenres(genres);
  console.log('Genres saved to the database');
};

module.exports.saveGenres = saveGenres;
