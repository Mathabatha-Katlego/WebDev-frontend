import React, { useState, useEffect } from 'react';
import MovieDataService from '../services/movies';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Media from 'react-bootstrap/Media';
import moment from 'moment';

const Movie = (props) => {
    // State variable to hold specific movie details
    const [movie, setMovie] = useState({
        id: null,
        title: '',
        rated: '',
        reviews: [],
    });

    // Fetch movie details and reviews from the server
    const getMovie = (id) => {
        MovieDataService.get(id)
            .then((response) => {
                setMovie(response.data);
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    // UseEffect hook to fetch movie details and reviews when the component mounts or when the movie ID changes
    useEffect(() => {
        getMovie(props.match.params.id);
    }, [props.match.params.id]);

    return (
        <div>
            <Container>
                <Row>
                    {/* Movie Poster */}
                    <Col>
                        <Image src={movie.poster + '/100px250'} fluid />
                    </Col>

                    {/* Movie Details and Reviews */}
                    <Col>
                        <Card>
                            <Card.Header as="h5">{movie.title}</Card.Header>
                            <Card.Body>
                                <Card.Text>{movie.plot}</Card.Text>
                                {/* Display "Add Review" link if a user is logged in */}
                                {props.user && (
                                    <Link to={`/movies/${props.match.params.id}/review`}>
                                        Add Review
                                    </Link>
                                )}
                            </Card.Body>
                        </Card>
                        <br />

                        {/* Display Reviews Section */}
                        <h2>Reviews</h2>
                        <br />

                        {/* Map through reviews and display each review using the Media component */}
                        {movie.reviews.map((review, index) => (
                            <Media key={index}>
                                <Media.Body>
                                    {/* Display review details */}
                                    <h5>
                                        {review.name} reviewed on{' '}
                                        {moment(review.date).format('Do MMMM YYYY')}
                                    </h5>
                                    <p>{review.review}</p>

                                    {/* Display "Edit" and "Delete" options if the logged-in user is the author of the review */}
                                    {props.user && props.user.id === review.user_id && (
                                        <Row>
                                            <Col>
                                                {/* Link to the "Edit Review" page with the current review as state */}
                                                <Link
                                                    to={{
                                                        pathname: `/movies/${props.match.params.id}/review`,
                                                        state: { currentReview: review },
                                                    }}
                                                >
                                                    Edit
                                                </Link>
                                            </Col>
                                            <Col>
                                                {/* Button to delete the review (Note: Actual deletion logic needs to be implemented) */}
                                                <Button variant="link">
                                                    {/* Removed the onClick attribute */}
                                                    Delete
                                                </Button>
                                            </Col>
                                        </Row>
                                    )}
                                </Media.Body>
                            </Media>
                        ))}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Movie;
