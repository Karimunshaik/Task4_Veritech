import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiPlay } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

const apiKey = "7e5122f42b3d47b2f9c1deaf4e1d2214";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original";
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";

const Card = ({ img, onClick }) => (
    <img className="card" src={img} alt="cover" onClick={onClick} />
);

const Row = ({ title, arr = [], onMovieClick }) => (
    <div className="row">
        <h2>{title}</h2>
        <div>
            {arr.map((item, index) => (
                <Card
                    key={index}
                    img={`${imgUrl}/${item.poster_path}`}
                    onClick={() => onMovieClick(item.id)}
                />
            ))}
        </div>
    </div>
);

const Home = () => {
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [genre, setGenre] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        const fetchUpcoming = async () => {
            const {
                data: { results },
            } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`);
            setUpcomingMovies(results);
        };
        const fetchNowPlaying = async () => {
            const {
                data: { results },
            } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`);
            setNowPlayingMovies(results);
        };
        const fetchPopular = async () => {
            const {
                data: { results },
            } = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`);
            setPopularMovies(results);
        };
        const fetchTopRated = async () => {
            const {
                data: { results },
            } = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`);
            setTopRatedMovies(results);
        };
        const getAllGenre = async () => {
            const {
                data: { genres },
            } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
            setGenre(genres);
        };

        getAllGenre();
        fetchUpcoming();
        fetchNowPlaying();
        fetchPopular();
        fetchTopRated();
    }, []);

    const fetchMovieDetails = async (movieId) => {
        const { data } = await axios.get(`${url}/movie/${movieId}?api_key=${apiKey}`);
        setSelectedMovie(data);
    };

    return (
        <section className="home">
            <div
                className="banner"
                style={{
                    backgroundImage: popularMovies[0]
                        ? `url(${`${imgUrl}/${popularMovies[0].poster_path}`})`
                        : "rgb(16, 16, 16)",
                }}
            >
                {popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}
                {popularMovies[0] && <p>{popularMovies[0].overview}</p>}

                <div>
                    <button>
                        <BiPlay /> Play{" "}
                    </button>
                    <button>
                        My List <AiOutlinePlus />{" "}
                    </button>
                </div>
            </div>

            <Row title={"Upcoming"} arr={upcomingMovies} onMovieClick={fetchMovieDetails} />
            <Row title={"Now Playing"} arr={nowPlayingMovies} onMovieClick={fetchMovieDetails} />
            <Row title={"Popular"} arr={popularMovies} onMovieClick={fetchMovieDetails} />
            <Row title={"Top Rated"} arr={topRatedMovies} onMovieClick={fetchMovieDetails} />

            <div className="genreBox">
                {genre.map((item) => (
                    <Link key={item.id} to={`/genre/${item.id}`}>
                        {item.name}
                    </Link>
                ))}
            </div>

            {/* Modal or Detailed Info Section */}
            {selectedMovie && (
                <div
                    className="modal"
                    style={{
                        backgroundImage: selectedMovie.poster_path
                            ? `url(${imgUrl}/${selectedMovie.poster_path})`
                            : "rgb(16, 16, 16)",
                    }}
                >
                    <div className="details">
                        <h2>{selectedMovie.original_title}</h2>
                        <p>{selectedMovie.overview}</p>
                        <p>{selectedMovie.Director}</p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Home;

