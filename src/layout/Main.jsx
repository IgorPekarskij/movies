import React from "react";
import { Cards } from "../components/Cards";
import { Loader } from "../components/Loader";
import { Search } from "../components/Search";
import { Error } from "../components/Error";
import { MovieDetails } from "../components/MovieDetails";

const MOVIES_API_KEY = process.env.REACT_APP_MOVIES_API_KEY;

export class Main extends React.Component {
    state = {
        movies: [],
        search: "matrix",
        loading: true,
        error: "",
        searchType: "all",
        id: "",
    };

    componentDidMount() {
        this.doSearch();
    }

    searchHandler = (data) => {
        this.setState(
            { search: data.search, searchType: data.searchType },
            () => {
                this.doSearch();
            }
        );
    };

    showDetails = (id) => {
        this.setState({ id: id });
    };

    doSearch = () => {
        if (this.state.search.length < 1) {
            return this.setState({
                error: "Please enter at least 2 character to search films.",
                movies: [],
                loading: false,
            });
        }

        this.setState({ loading: true });
        fetch(
            `https://www.omdbapi.com/?apikey=${MOVIES_API_KEY}&s=${
                this.state.search
            }${
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

    getContent = () => {
        const { loading, movies, id } = this.state;
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
                        <Cards movies={movies} showDetails={this.showDetails} />
                    )}
                </>
            );
        }
    };

    render() {
        return <div className="container content">{this.getContent()}</div>;
    }
}
