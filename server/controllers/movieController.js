const movieModel = require('../models/movieModel.js');
const apiHelpers = require('../helpers/apiHelpers.js');
const axios = require('axios');
const { API_KEY } = require('../../config.js');
const { saveFaves, deleteFaves, getFaves } = require('../models/movieModel.js');
//Return requests to the client
module.exports = {
  getSearch: (req, res) => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.asc&results=100&vote_count.gte=10&api_key=${API_KEY}`
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
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
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
  saveMovie: (req, res) => {
    let movie = req.body;
    saveFaves(movie);
    res.send(201);
  },
  deleteMovie: (req, res) => {
    let reMovie = req.body;
    console.log(reMovie);
    deleteFaves(reMovie);
    res.send(200);
  },

  getFaves: (req, res) => {
    getFaves().then(faves => {
      res.send(faves);
    });
  }
};
