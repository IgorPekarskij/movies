import React, { useState, useEffect } from "react";
import { Error } from "../components/Error";
import { Loader } from "../components/Loader";

const API_KEY = process.env.REACT_APP_MOVIES_API_KEY;

export function MovieDetails(props) {
    const [film, setFilm] = useState({});
    const [loading, setLoading] = useState(true);

    const {
        Title: title,
        Genre: genre,
        Poster: poster,
        Released: released,
        Runtime: runtime,
        Director: director,
        Writer: writer,
        Actors: actors,
        Plot: plot,
        Country: country,
        Awards: awards,
    } = film;

    useEffect(() => {
        fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&i=${props.id}&plot=full`
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setFilm(data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                <Error error={error} />;
            });
    }, []);

    return (
        <div className="film-details">
            <a
                className="waves-effect waves-light btn-small"
                href={
                    window.location.hostname === "igorpekarskij.github.io"
                        ? "/movies"
                        : "/"
                }
            >
                Back
            </a>
            {loading ? (
                <Loader />
            ) : (
                <div className="row">
                    <div className="col s12">
                        <div className="card large">
                            <div className="card-image">
                                <img src={poster} alt={title} />
                            </div>
                            <div className="card-content">
                                <p>
                                    <strong className="movie-title">
                                        {title}
                                    </strong>
                                    <span className="right">
                                        <strong>Genre:</strong> {genre}
                                    </span>
                                </p>
                                <p>
                                    <span>
                                        <strong>Release date:</strong>{" "}
                                        {released}
                                    </span>
                                    <span className="right">
                                        <strong>Country:</strong> {country}
                                    </span>
                                </p>
                                <p>
                                    <span>
                                        <strong>Director:</strong> {director}
                                    </span>
                                    <span className="right">
                                        <strong>Writer:</strong> {writer}
                                    </span>
                                </p>
                                <p>
                                    <span>
                                        <strong>Awards:</strong> {awards}
                                    </span>
                                    <span className="right">
                                        <strong>Runtime:</strong> {runtime}
                                    </span>
                                </p>
                                <p>
                                    <span>
                                        <strong>Actors:</strong> {actors}
                                    </span>
                                </p>
                                <p>
                                    <strong>Description:</strong> {plot}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
