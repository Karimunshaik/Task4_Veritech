// MovieDetails.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const apiKey = "7e5122f42b3d47b2f9c1deaf4e1d2214";
const url = "https://api.themoviedb.org/3";

const MovieDetails = ({ match }) => {
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            const { data } = await axios.get(`${url}/movie/${match.params.movieId}?api_key=${apiKey}`);
            setMovie(data);
        };

        fetchMovieDetails();
    }, [match.params.movieId]);

    return (
        <div>
            {movie && (
                <div>
                    <h2>{movie.original_title}</h2>
                    <p>{movie.overview}</p>
                    {/* Add more details as needed */}
                </div>
            )}
        </div>
    );
};

export default MovieDetails;
