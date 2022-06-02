import React, { useState } from "react";

export function Search(props) {
    const { searchHandler } = props;
    const [search, setSearch] = useState("");
    const [searchType, setSearchType] = useState("all");

    const searchChangeHandler = (event) => {
        setSearch(event.target.value);
    };

    const doSearch = (event) => {
        if (event.keyCode === 13) {
            searchHandler({
                search: search,
                searchType: searchType,
            });
        }
    };

    const handleTypeChange = (event) => {
        setSearchType(event.target.value);
        searchHandler({
            search: search,
            searchType: event.target.value,
        });
    };

    return (
        <div className="search" onKeyUp={doSearch}>
            <div className="search-row">
                <span className="search-input">
                    <input
                        placeholder="search"
                        type="search"
                        className="validate"
                        value={search}
                        onChange={searchChangeHandler}
                    />
                </span>
                <span className="button-search">
                    <button
                        className="btn waves-effect waves-light btn-small search-button"
                        onClick={() => {
                            searchHandler({
                                search: search,
                                searchType: searchType,
                            });
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
