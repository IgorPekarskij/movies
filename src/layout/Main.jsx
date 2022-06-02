import React, { useEffect, useState } from "react";
import { Cards } from "../components/Cards";
import { Loader } from "../components/Loader";
import { Search } from "../components/Search";
import { Error } from "../components/Error";
import { MovieDetails } from "../components/MovieDetails";

const MOVIES_API_KEY = process.env.REACT_APP_MOVIES_API_KEY;
const FILMS_PER_PAGE = 10;

export function Main() {
    const [isInit, setIsInit] = useState(true);
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("matrix");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchType, setSearchType] = useState("all");
    const [id, setId] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [totalMoviesCount, setTotalMoviesCount] = useState(0);

    const searchHandler = (data) => {
        setSearch(data.search);
        setSearchType(data.searchType);
        setPageNumber(1);
    };

    const showDetails = (id) => {
        setId(id);
    };

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

    const swapPage = (pageCount) => {
        setPageNumber(pageNumber + pageCount);
    };

    const getContent = () => {
        if (id.length > 0) {
            return <MovieDetails id={id} />;
        } else {
            return (
                <>
                    <Search searchHandler={searchHandler} />
                    {loading ? (
                        <Loader />
                    ) : error.length > 0 ? (
                        <Error error={error} />
                    ) : (
                        <Cards
                            isLast={
                                totalMoviesCount / pageNumber < FILMS_PER_PAGE
                            }
                            isFirst={pageNumber === 1}
                            movies={movies}
                            swapPage={swapPage}
                            showDetails={showDetails}
                        />
                    )}
                </>
            );
        }
    };

    useEffect(() => {
        doSearch();
        setIsInit(false);
    }, []);

    useEffect(() => {
        if (!isInit) {
            doSearch();
        }
    }, [search, searchType, pageNumber]);

    return <div className="container content">{getContent()}</div>;
}
