import axios from "axios"; 

class MovieDataService { 
    getAll(page = 0) {
        return axios.get(`https://movies-ln6f.onrender.com/api/v1/movies?page=${page}`);
    }

    get(id) {
        return axios.get(`https://movies-ln6f.onrender.com/api/v1/movies/id/${id}`);
    }

    find(query, by = "title", page = 0) {
        return axios.get(`https://movies-ln6f.onrender.com/api/v1/movies?${by}=${query}&page=${page}`);
    }

    createReview(data) {
        return axios.post("https://movies-ln6f.onrender.com/api/v1/movies/review", data);
    }

    updateReview(data) {
        return axios.put("https://movies-ln6f.onrender.com/api/v1/movies/review", data);
    }

    deleteReview(id, userId) {
        return axios.delete(
            "https://movies-ln6f.onrender.comapi/v1/movies/review",
            { data: { review_id: id, user_id: userId } }
        );
    }

    getRatings() {
        return axios.get("https://movies-ln6f.onrender.com/api/v1/movies/ratings");
    }
}

const movieDataService = new MovieDataService();
export default movieDataService;

