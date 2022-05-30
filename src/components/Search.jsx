import React from "react";

export class Search extends React.Component {
    constructor(props) {
        super(props);
        this.searchHandler = props.searchHandler;
        this.state = {
            search: "",
            searchType: "all",
        };
    }

    searchChangeHandler = (event) => {
        this.setState({ search: event.target.value });
    };

    doSearch = (event) => {
        if (event.keyCode === 13) {
            console.log("event.keyCode", event.keyCode);
            this.searchHandler({
                search: this.state.search,
                searchType: this.state.searchType,
            });
        }
    };

    handleTypeChange = (event) => {
        console.log("event.target.value ", event.target.value);
        this.setState({ searchType: event.target.value }, () =>
            this.searchHandler({
                search: this.state.search,
                searchType: this.state.searchType,
            })
        );
    };

    render() {
        return (
            <div className="search" onKeyUp={this.doSearch}>
                <div className="search-row">
                    <span className="search-input">
                        <input
                            placeholder="search"
                            type="search"
                            className="validate"
                            value={this.state.search}
                            onChange={this.searchChangeHandler}
                        />
                    </span>
                    <span className="button-search">
                        <button
                            className="btn waves-effect waves-light btn-small search-button"
                            onClick={() => {
                                this.searchHandler({
                                    search: this.state.search,
                                    searchType: this.state.searchType,
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
                            onChange={this.handleTypeChange}
                            checked={this.state.searchType === "all"}
                        />
                        <span>All</span>
                    </label>
                    <label>
                        <input
                            type="radio"
                            className="with-gap"
                            name="searchType"
                            value="movie"
                            onChange={this.handleTypeChange}
                            checked={this.state.searchType === "movie"}
                        />
                        <span>Only Movies</span>
                    </label>
                    <label>
                        <input
                            type="radio"
                            className="with-gap"
                            name="searchType"
                            value="series"
                            onChange={this.handleTypeChange}
                            checked={this.state.searchType === "series"}
                        />
                        <span>Only Series</span>
                    </label>
                    <label>
                        <input
                            type="radio"
                            className="with-gap"
                            name="searchType"
                            value="game"
                            onChange={this.handleTypeChange}
                            checked={this.state.searchType === "game"}
                        />
                        <span>Only Games</span>
                    </label>
                </div>
            </div>
        );
    }
}
