import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [{deway: "movies"}],
      genreMovies: [],
      favorites: [],
      showFaves: false,
      genre: ''
    };
    this.handleChange = this.handleChange.bind(this)
    this.swapFavorites = this.swapFavorites.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  async handleChange(e) {
    let selectedGenre = []
    await this.setState({genre: e.target.value})
    for (var i = 0; i < this.state.movies.length; i++) {
      if (this.state.movies[i].genre_ids.includes(Number(this.state.genre))){ 
        selectedGenre.push(this.state.movies[i])
      }
    }
    await this.setState({genreMovies: selectedGenre});
  }

  componentDidMount(){
    this.getMovies();
    this.getFaves();
    // load up the favorites
  }

  async getFaves() {
    await axios.get('movies/faves').then( (res) => {
      this.setState({favorites: res.data})
    })
  }

  // genre id
  getMovies() {
    axios
    .get('/movies/search').then( (res) => {
      this.setState({movies: res.data})
      this.setState({genreMovies: res.data})
    })
    .then( () => {
      console.log('The state of movies', this.state.movies)
    })
    .catch( err => console.log(err));
    // make an axios request to your server on the GET SEARCH endpoint
  }

  // add on click handler
  // if showFaves is true, delete the movies
  // if showFaves is false, add the movies
  handleClick(e) {
    let movieId = e.currentTarget.id;
    if (this.state.showFaves === false) {
      this.saveMovie(movieId)
    } else {
      this.deleteMovie(movieId)
    }
    
  }
  saveMovie(movieId) {
    // same as above but do something diff
    
    for (let i = 0; i < this.state.movies.length; i++) {
      if (this.state.movies[i].id === Number(movieId)) {
        var fave = this.state.movies[i];
      }
    }
    let currentFaves = this.state.favorites.slice()
    if (currentFaves.indexOf(fave) === -1) {
      currentFaves.push(fave)
    }
    this.setState({favorites: currentFaves})
    axios.post('/movies/save', fave).then( ()=> {
      console.log(fave.title, ' was added to Favorites!')
    })
  }

  deleteMovie(movieId) {
    // same as above but do something diff
    let currentFaves = this.state.favorites.slice()
    for (let i = 0; i < currentFaves.length; i++) {
      if (currentFaves[i].id === Number(movieId)) {
        var reMovie = currentFaves[i]
        currentFaves.splice(i,1)
        this.setState({favorites : currentFaves})
      }
    }

    axios.delete('movies/delete', {data: reMovie}).then( () => {
    console.log(reMovie.title, ' was removed from Favorites!')
    })
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header> 
        <div className="main">
          <Search 
          handleChange={this.handleChange} 
          swapFavorites={this.swapFavorites} 
          showFaves={this.state.showFaves}/>
          <Movies 
          handleClick = {this.handleClick}
          currentGenre={this.state.genre} 
          movies={this.state.showFaves ? this.state.favorites : this.state.movies} 
          // need to fix this line, it breaks when show faves is hit
          genreMovies={this.state.showFaves ? this.state.favorites : this.state.genreMovies} 
          showFaves={this.state.showFaves}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));