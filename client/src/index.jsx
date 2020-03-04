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
      favorites: [{deway: "favorites"}],
      showFaves: false,
      genre: ''
    };
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({genre: e.target.value})
    console.log('The selected Genre is :', this.state.genre);
  }

  componentDidMount(){
    this.getMovies();
  }

  getMovies() {
    axios
    .get('/movies/search').then( (res) => {
      this.setState({movies: res.data})
    })
    .then( () => {
      console.log(this.state.movies)
    })
    .catch( err => console.log(err));
    // make an axios request to your server on the GET SEARCH endpoint
  }

  saveMovie() {
    // same as above but do something diff
  }

  deleteMovie() {
    // same as above but do something diff
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
          <Search handleChange={this.handleChange} swapFavorites={this.swapFavorites} showFaves={this.state.showFaves}/>
          <Movies currentGenre={this.state.genre} movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));