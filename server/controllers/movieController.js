const movieModel = require('../models/movieModel.js');
const apiHelpers = require('../helpers/apiHelpers.js');
const axios = require('axios');
const { API_KEY } = require('../../config.js');
const db = require('../models/movieModel.js');
//Return requests to the client
module.exports = {
  getSearch: (req, res) => {
    // get the search genre
    axios
      .get(
        'https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.asc&api_key=8719598a3b0b1c30d9d78183a283ce31'
      )
      .then(response => {
        let worstMovies = response.data.results;
        res.status(200).json(worstMovies);
      })
      .catch(err => {
        console.log('Movie query to MDB failed');
        res.send(500);
      });
  },
  getGenres: (req, res) => {
    axios
      .get(
        'https://api.themoviedb.org/3/genre/movie/list?api_key=8719598a3b0b1c30d9d78183a283ce31&language=en-US'
      )
      .then(response => {
        let genres = response.data.genres;
        res.status(200).json(genres);
      })
      .catch(err => {
        console.log('Genre query to MDB failed');
        res.send(500);
      });
    // make an axios request to get the list of official genres
    // use this endpoint, which will also require your API key: https://api.themoviedb.org/3/genre/movie/list
    // send back
  },
  saveMovie: (req, res) => {},
  deleteMovie: (req, res) => {}
};
