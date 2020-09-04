import React, { useState, Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useLocation,
  useHistory,
  Redirect,
  withRouter
} from "react-router-dom";

import { createBrowserHistory } from "history";

import history from "./utils/history";

import MovieDataArr from "./movie.mock-data.json";
let genresArr = [];
MovieDataArr.map((movie) => {
    return (
      movie.genres.map((genre) => {
        return (
            genresArr.push(genre)
        );
      })
    );
});
genresArr = Array.from(new Set(genresArr));
console.log(genresArr);

// Redux usage
function counter(state = 0, action) {
  switch (action.type) {
    case 'VIEW':
      let movie_view_counter = parseInt(localStorage.getItem('movie_view_counter'));
      console.log(movie_view_counter);
      localStorage.setItem('movie_view_counter', movie_view_counter + 1);
      return movie_view_counter + 1
    default:
      return state
  }
}
let MovieViewer = createStore(counter);
MovieViewer.subscribe(() => console.log(MovieViewer.getState()));

export default function App() {
  return (
    <Router>
      <div className="container-fluid">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <Link className="App-link" to="/">Home</Link>
            </li>
            <li class="nav-item">
              <Link className="App-link" to="/movies">Movies</Link>
            </li>
          </ul>
          </div>
        </nav>
        <MovieCounter />
        <Search /> 
        <Switch>
          <Route path="/movies">
            <Movies />
          </Route>
          <Route path="/search/:term">
            <SearchResults />
          </Route>
          <Route path="/movie/:slug">
            <Link className="App-link" to="/movies">Back to list</Link>
            <Movie />
          </Route>
          <Route path="/">
            <Home />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        The page you look for not found: <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

function Home() {
  return <h2>Welcome to Test Assignment.</h2>;
}

function MovieCounter() {
  const movie_view_counter = localStorage.getItem('movie_view_counter');
  return <h6>Viewed Movies: {movie_view_counter}</h6>;
}

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.history = createBrowserHistory();;
    this.input = React.createRef();  
  }

  handleSearch() {
    document.location.href = `/search/${this.input.current.value}`;
  }

  render() {
    return (
      <div class="row">
        <div class="col-md-4">
          <div class="search">
          <input type="text" class="form-control" name="search" ref={this.input} placeholder="" />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.handleSearch}>Search</button>
          </div>
        </div>
      </div>
    );
  };
}

function SearchResults() {
    let { term } = useParams();
    let MoviesArr = MovieDataArr;

    let regex = new RegExp(term, "gi");
    MoviesArr = MoviesArr.filter((item) => (item.name.match(regex) || item.description.match(regex)));
    
    return (
      <div class="list-group list-group-flush">
                {
                  MoviesArr.map((movie) => {
                    return (
                    <div class="card">
                      <div class="card-body">
                        <img src={'/assets/images/' + movie.img} class="movie-poster img-responsive" alt="{movie.name}" />
                        <h5 class="card-title">{movie.name}</h5>
                        <p class="card-text">{movie.description}</p>
                        <p>
                        {
                          movie.genres.map((genre) => {
                            return (
                                <span class="badge badge-pill badge-warning">
                                  {genre}
                                </span>
                            );
                          })
                        }
                        </p>
                        <p><span class="badge badge-primary badge-pill">{movie.rate}</span></p>
                        <a href={'/movie/' + movie.key} class="btn btn-primary">View</a>
                      </div>
                    </div>
                    );
                  })
                } 
            </div>
    );
}

function GenreSelector() {
  return (<div class="dropdown">
  <select class="form-control">
  {
                  genresArr.map((genre) => {
                    return (
                      <option value="{genre}">{genre}</option>
                    );
                  })
  }
  </select>
  <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Filter</button>
  </div>);
}

function Movie() {
    let { slug } = useParams();

    const movie = MovieDataArr.find(movie => movie.key === slug);
    if (movie === undefined) {
      return false; // Movie not found
    }

    MovieViewer.dispatch({ type: 'VIEW' });

    return (
        <div class="card">
                      <div class="card-body">
                        <img src={'/assets/images/' + movie.img} class="movie-poster img-responsive" alt="{movie.name}" />
                        <h5 class="card-title">{movie.name}</h5>
                        <p class="card-text">{movie.description}</p>
                        <p>
                        {
                          movie.genres.map((genre) => {
                            return (
                                <span class="badge badge-pill badge-warning">
                                  {genre}
                                </span>
                            );
                          })
                        }
                        </p>
                        <p><span class="badge badge-primary badge-pill">{movie.rate}</span></p>
                        <a href={'/movies/'} class="btn btn-primary">Back to list</a>
                      </div>
                    </div>
    );
}

function Movies(SearchTerm) {
  let MoviesArr = MovieDataArr;

    return (
            <div class="list-group list-group-flush">
                {
                  MoviesArr.map((movie) => {
                    return (
                    <div class="card">
                      <div class="card-body">
                        <img src={'/assets/images/' + movie.img} class="movie-poster img-responsive" alt="{movie.name}" />
                        <h5 class="card-title">{movie.name}</h5>
                        <p class="card-text">{movie.description}</p>
                        <p>
                        {
                          movie.genres.map((genre) => {
                            return (
                                <span class="badge badge-pill badge-warning">
                                  {genre}
                                </span>
                            );
                          })
                        }
                        </p>
                        <p><span class="badge badge-primary badge-pill">{movie.rate}</span></p>
                        <a href={'/movie/' + movie.key} class="btn btn-primary">View</a>
                      </div>
                    </div>
                    );
                  })
                } 
            </div>
        );
}

ReactDOM.render(
  <Router basename={process.env.PUBLIC_URL}>
    <App />
  </Router>,
  document.getElementById("root")
);