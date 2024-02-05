import React, { useState, useEffect } from 'react';
import MovieDataService from "../services/movies";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

const MoviesList = (props) => {
  // State variables
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchRating, setSearchRating] = useState("");
  const [ratings, setRatings] = useState(["All Ratings"]);

  // Fetch movies and ratings on component mount, after component is rendered.
  useEffect(() => {
    retrieveMovies(); 
    retrieveRatings();
  }, []);

  // Fetch all movies from the database
  const retrieveMovies = () => {
    MovieDataService.getAll()
      .then((response) => {
        console.log(response.data);
        setMovies(response.data.movies);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Fetch available ratings from the database
  const retrieveRatings = () => {
    MovieDataService.getRatings()
      .then((response) => {
        console.log(response.data);
        setRatings(["All Ratings"].concat(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Handle changes in the search title input
  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  // Handle changes in the search rating select
  const onChangeSearchRating = (e) => {
    const searchRating = e.target.value;
    setSearchRating(searchRating);
  };

  // Function to search movies by title
  const findByTitle = () => {
    find(searchTitle, "title");
  };

  // Function to search movies by rating
  const findByRating = () => {
    if (searchRating === "All Ratings") {
      retrieveMovies();
    } else {
      find(searchRating, "rated");
    }
  };

  // Function to make API call for searching movies
  const find = (query, by) => {
    MovieDataService.find(query, by)
      .then(response => {
        console.log(response.data);
        setMovies(response.data.movies);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="App">
      {/* Main container */}
      <Container>
        {/* Search form */}
        <Form>
          {/* Search bars and buttons */}
          <Row>
            <Col>
              {/* Search by title input */}
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Search by title"
                  value={searchTitle}
                  onChange={onChangeSearchTitle}
                />
              </Form.Group>
              {/* Button to trigger search by title */}
              <Button variant="primary" type="button" onClick={findByTitle}>
                Search by Title
              </Button>
            </Col>
            <Col>
              {/* Search by rating select */}
              <Form.Group>
                <Form.Control as="select" onChange={onChangeSearchRating}>
                  {ratings.map((rating) => (
                    <option key={rating} value={rating}>
                      {rating}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              {/* Button to trigger search by rating */}
              <Button variant="primary" type="button" onClick={findByRating}>
                Search by Rating
              </Button>
            </Col>
          </Row>

          {/* Empty row for spacing */}
          <Row>
            <Col>
              {/* Empty column to create space */}
            </Col>
          </Row>

          {/* Movie cards */}
          <Row>
            {movies.map((movie) => (
              <Col key={movie._id}>
                <Card style={{ width: '18rem' }}>
                  <Card.Img src={movie.poster + "/100px180"} />
                  <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>
                      Rating: {movie.rated}
                    </Card.Text>
                    <Card.Text>{movie.plot}</Card.Text>
                    <Link to={"/movies/" + movie._id}>View Reviews</Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default MoviesList;
