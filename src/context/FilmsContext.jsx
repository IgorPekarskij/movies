import React, { createContext, useState } from "react";

const DEFAULT_STATE = {
    movies: [],
    search: "matrix",
    loading: true,
    error: "",
    searchType: "all",
    id: "",
    pageNumber: 1,
    totalFilmsCount: 0,
};

export const MoviesContext = createContext(DEFAULT_STATE);

export const Context = (props) => {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("matrix");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchType, setSearchType] = useState("all");
    const [id, setId] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [totalMoviesCount, setTotalMoviesCount] = useState(0);

    const contextPayload = {
        movies,
        search,
        loading,
        error,
        searchType,
        id,
        pageNumber,
        totalMoviesCount,
        setMovies,
        setSearch,
        setLoading,
        setError,
        setSearchType,
        setId,
        setPageNumber,
        setTotalMoviesCount,
    };

    return (
        <MoviesContext.Provider value={contextPayload}>
            {props.children}
        </MoviesContext.Provider>
    );
};
