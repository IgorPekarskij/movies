import React, { useEffect, useContext } from "react";
import { Cards } from "../components/Cards";
import { Loader } from "../components/Loader";
import { Search } from "../components/Search";
import { Error } from "../components/Error";
import { MovieDetails } from "../components/MovieDetails";
import { MoviesContext } from "../context/FilmsContext";

const MOVIES_API_KEY = process.env.REACT_APP_MOVIES_API_KEY;

export function Main() {
    const {
        id,
        movies,
        search,
        searchType,
        pageNumber,
        loading,
        error,
        setError,
        setMovies,
        setLoading,
        setTotalMoviesCount,
    } = useContext(MoviesContext);

    const handleError = () => {
        setError("Please enter at least 2 character to search films.");
        setMovies([]);
        setLoading(false);
    };

    const doSearch = () => {
        if (search.length < 1) {
            return handleError();
        }

        fetch(
            `https://www.omdbapi.com/?apikey=${MOVIES_API_KEY}&page=${pageNumber}&s=${search}${
                searchType !== "all" ? `&type=${searchType}` : ""
            }`
        )
            .then((result) => {
                return result.json();
            })
            .then((movies) => {
                if (movies.Search) {
                    setMovies(movies.Search);
                    setTotalMoviesCount(+movies.totalResults);
                    setError("");
                    setLoading(false);
                } else {
                    setError(movies["Error"]);
                    setLoading(false);
                }
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
                setMovies([]);
            });
    };

    const getContent = () => {
        if (id.length > 0) {
            return <MovieDetails id={id} />;
        } else {
            return (
                <>
                    <Search />
                    {loading ? (
                        <Loader />
                    ) : error.length > 0 ? (
                        <Error error={error} />
                    ) : (
                        <Cards movies={movies} />
                    )}
                </>
            );
        }
    };

    useEffect(() => {
        doSearch();
    }, [search, searchType, pageNumber]);

    return <div className="container">{getContent()}</div>;
}
