// Importing required modules
import express from 'express';
import cors from 'cors';

// Importing the movies route module
import movies from './api/movies.route.js';

// Creating an instance of the Express application
const app = express();

// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Middleware to parse incoming JSON data
app.use(express.json());

// Routing for '/api/v1/movies'
app.use("/api/v1/movies", movies);

// 404 Error handling for routes not defined
app.use('*', (req, res) => {
    res.status(404).json({ error: "not found" });
});

// Exporting the configured Express app
export default app;
