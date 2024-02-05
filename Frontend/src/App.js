import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddReview from "./components/add-review";
import MoviesList from "./components/movies-list";
import Movie from "./components/movie";
import Login from "./components/login";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function App() {
  // Initialize user state with a default value or logic to determine login state
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function Logout() {
    setUser(null);
  }

  return (
    <div className="App">
      <BrowserRouter>
        {/* Navigation Bar */}
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>Movie Reviews</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {/* Link to Movies List */}
              <Nav.Link>
                <Link to={"/movies"}>Movies</Link>
              </Nav.Link>
              {/* Conditional Link for Login/Logout */}
              <Nav.Link>
                {user ? (
                  <a onClick={Logout}>Logout User</a>
                ) : (
                  <Link to={"/login"}>Login</Link>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        {/* Routing */}
        <Switch>
          {/* Route for Movies List */}
          <Route exact path={["/", "/movies"]} component={MoviesList} />
          {/* Route for adding a review */}
          <Route path="/movies/:id/review" render={(props) =>
            <AddReview {...props} user={user} />
          } />
          {/* Route for individual movie details */}
          <Route path="/movies/:id/" render={(props) =>
            <Movie {...props} user={user} />
          } />
          {/* Route for Login */}
          <Route path="/login" render={(props) =>
            <Login {...props} login={login} />
          } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;