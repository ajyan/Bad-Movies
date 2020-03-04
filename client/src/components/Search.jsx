import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: [],
      value: ''
    };
  }
  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    axios.get('/movies/genres').then( (res) => {
      this.setState({genres: res.data})
    }).catch( err => console.log(err));
  }

  componentDidMount() {
    this.getGenres();
  }

  

  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>

        {/* How can you tell which option has been selected from here? */}

        <select value={this.state.value} onChange={this.props.handleChange}>
          {this.state.genres.map( (genre) => {
            return <option key={genre.id} value={genre.id}>{genre.name}</option>
          })}
        
        </select>
        <br/><br/>

        <button>Search</button>

      </div>
    );
  }
}

export default Search;