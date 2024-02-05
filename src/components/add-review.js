import React, { useState } from 'react';
import MovieDataService from "../services/movies";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AddReview = props => {
    // State to manage the review text and submission status
    let editing = false
    let initialReviewState = ''
    const [review, setReview] = useState("");
    const [submitted, setSubmitted] = useState(false);

    // Set initial review state when the component mounts
    useState(() => {
        setReview(initialReviewState);
    }, [initialReviewState]);

    // Handler for updating the review state when the input changes
    const onChangeReview = e => {
        const review = e.target.value;
        setReview(review);
    }

    // Handler for saving the review
    const saveReview = () => {
        // Data object to be sent to the server
        const data = {
            review: review,
            name: props.user.name,
            user_id: props.user.id,
            movie_id: props.match.params.id,
            // get movie id directly from the URL
        }

        if (editing) {
            // If editing, include the existing review id
            data.review_id = props.location.state.currentReview._id;

            // Update the existing review
            MovieDataService.updateReview(data)
                .then(response => {
                    setSubmitted(true);
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        } else {
            // Create a new review
            MovieDataService.createReview(data)
                .then(response => {
                    setSubmitted(true);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    return (
        <div>
            {submitted ? (
                // Display a success message and provide a link to go back to the movie details
                <div>
                    <h4>Review submitted successfully</h4>
                    <Link to={"/movies/" + props.match.params.id}>
                        Back to Movie
                    </Link>
                </div>
            ) : (
                // Display the review form
                <Form>
                    <Form.Group>
                        <Form.Label>{editing ? "Edit" : "Create"} Review</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            value={review}
                            onChange={onChangeReview}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={saveReview}>
                        Submit
                    </Button>
                </Form>
            )}
        </div>
    )
}

export default AddReview;
