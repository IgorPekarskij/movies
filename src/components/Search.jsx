import React, { useState, useContext } from "react";
import { MoviesContext } from "../context/FilmsContext";

export function Search() {
    const { search, searchType, setPageNumber, setSearch, setSearchType } =
        useContext(MoviesContext);
    const [localSearch, setLocalSearch] = useState(search);
    const [localSearchType, setLocalSearchType] = useState(searchType);

    const searchChangeHandler = (event) => {
        setLocalSearch(event.target.value);
    };

    const searchHandler = () => {
        setSearch(localSearch);
        setSearchType(localSearchType);
        setPageNumber(1);
    };

    const doSearch = (event) => {
        if (event.keyCode === 13) {
            searchHandler();
        }
    };

    const handleTypeChange = (event) => {
        setLocalSearchType(event.target.value);
        searchHandler();
    };

    return (
        <div className="search" onKeyUp={doSearch}>
            <div className="search-row">
                <span className="search-input">
                    <input
                        placeholder="search"
                        type="search"
                        className="validate"
                        value={localSearch}
                        onChange={searchChangeHandler}
                    />
                </span>
                <span className="button-search">
                    <button
                        className="btn waves-effect waves-light btn-small search-button"
                        onClick={() => {
                            searchHandler();
                        }}
                    >
                        Search
                    </button>
                </span>
            </div>
            <div className="search-type-section">
                <label>
                    <input
                        type="radio"
                        className="with-gap"
                        name="searchType"
                        value="all"
                        onChange={handleTypeChange}
                        checked={searchType === "all"}
                    />
                    <span>All</span>
                </label>
                <label>
                    <input
                        type="radio"
                        className="with-gap"
                        name="searchType"
                        value="movie"
                        onChange={handleTypeChange}
                        checked={searchType === "movie"}
                    />
                    <span>Only Movies</span>
                </label>
                <label>
                    <input
                        type="radio"
                        className="with-gap"
                        name="searchType"
                        value="series"
                        onChange={handleTypeChange}
                        checked={searchType === "series"}
                    />
                    <span>Only Series</span>
                </label>
                <label>
                    <input
                        type="radio"
                        className="with-gap"
                        name="searchType"
                        value="game"
                        onChange={handleTypeChange}
                        checked={searchType === "game"}
                    />
                    <span>Only Games</span>
                </label>
            </div>
        </div>
    );
}
