import React from "react";
import { Cards } from "../components/Cards";
import { Loader } from "../components/Loader";
import { Search } from "../components/Search";
import { Error } from "../components/Error";
import { MovieDetails } from "../components/MovieDetails";

const MOVIES_API_KEY = process.env.REACT_APP_MOVIES_API_KEY;
const FILMS_PER_PAGE = 10;

export class Main extends React.Component {
    state = {
        movies: [],
        search: "matrix",
        loading: true,
        error: "",
        searchType: "all",
        id: "",
        pageNumber: 1,
        totalFilmsCount: 0,
    };

    componentDidMount() {
        this.doSearch(true);
    }

    searchHandler = (data) => {
        this.setState(
            { search: data.search, searchType: data.searchType, pageNumber: 1 },
            () => {
                this.doSearch(false);
            }
        );
    };

    showDetails = (id) => {
        this.setState({ id: id });
    };

    doSearch = (isInit) => {
        if (this.state.search.length < 1) {
            return this.setState({
                error: "Please enter at least 2 character to search films.",
                movies: [],
                loading: false,
            });
        }
        const pageNumber = isInit ? 1 : this.state.pageNumber;
        this.setState({ loading: true, pageNumber: pageNumber });
        fetch(
            `https://www.omdbapi.com/?apikey=${MOVIES_API_KEY}&page=${
                this.state.pageNumber
            }&s=${this.state.search}${
                this.state.searchType !== "all"
                    ? `&type=${this.state.searchType}`
                    : ""
            }`
        )
            .then((result) => {
                return result.json();
            })
            .then((movies) => {
                if (movies.Search) {
                    this.setState({
                        movies: movies.Search,
                        totalFilmsCount: +movies.totalResults,
                        loading: false,
                        error: "",
                    });
                } else {
                    this.setState({ loading: false, error: movies["Error"] });
                }
            })
            .catch((error) => {
                this.setState({ error: error, movies: [], loading: false });
            });
    };

    swapPage = (pageCount) => {
        this.setState({ pageNumber: this.state.pageNumber + pageCount }, () =>
            this.doSearch(false)
        );
    };

    getContent = () => {
        const { loading, movies, id, totalFilmsCount, pageNumber } = this.state;
        if (id.length > 0) {
            return <MovieDetails id={id} />;
        } else {
            return (
                <>
                    <Search searchHandler={this.searchHandler} />
                    {loading ? (
                        <Loader />
                    ) : this.state.error.length > 0 ? (
                        <Error error={this.state.error} />
                    ) : (
                        <Cards
                            isLast={
                                totalFilmsCount / pageNumber < FILMS_PER_PAGE
                            }
                            isFirst={pageNumber === 1}
                            movies={movies}
                            swapPage={this.swapPage}
                            showDetails={this.showDetails}
                        />
                    )}
                </>
            );
        }
    };

    render() {
        return <div className="container content">{this.getContent()}</div>;
    }
}
