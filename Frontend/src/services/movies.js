import axios from "axios"; //for sending get, put, post and delete requests

class MovieDataService {
    getAll(page = 0) {
        return axios.get(`http://localhost:5000/api/v1/movies?page=${page}`) //returns all movies. we put URL into get method.
    }
    get(id) {
        return axios.get(`http://localhost:5000/api/v1/movies/id/${id}`) //gets specific movie. served by apigetmoviebyid
    }
    find(query, by = "title", page = 0) {
        return axios.get(
            `http://localhost:5000/api/v1/movies?${by}=${query}&page=${page}`// gets movie by title
        )
    }
    createReview(data) {
        return axios.post("http://localhost:5000/api/v1/movies/review", data)
    }
    updateReview(data) {
        return axios.put("http://localhost:5000/api/v1/movies/review", data)
    }
    deleteReview(id, userId) {
        return axios.delete(
            "http://localhost:5000/api/v1/movies/review",
            { data: { review_id: id, user_id: userId } }
        )
    }
    getRatings() {
        return axios.get("http://localhost:5000/api/v1/movies/ratings")
    }
}
export default new MovieDataService()