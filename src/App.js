import React from 'react';
import ReactDOM from 'react-dom';
import MoviesApp from 'redux';

import logo from './logo.svg';
import './css/index.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
        <nav>
          <ul>
            <li>
              <Link className="App-link" to="/">Home</Link>
            </li>
            <li>
              <Link className="App-link" to="/movies">Movies</Link>
            </li>
          </ul>
        </nav>
        </header>
        <Switch>
          <Route path="/movies">
            <Movies />
          </Route>
          <Route path="/movies/:slug">
            <Movie />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function Movies() {
  return <h2>Movies</h2>;
}

function Movie() {
  return <h2>Selected Movie</h2>;
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);