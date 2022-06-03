import React, { useContext } from "react";
import { MoviesContext } from "../context/FilmsContext";

const FILMS_PER_PAGE = 10;

export function Paginator(props) {
    const { pageNumber, totalMoviesCount, setPageNumber } =
        useContext(MoviesContext);
    return (
        <div className="paginator">
            <button
                className="btn waves-effect waves-light"
                disabled={pageNumber === 1}
                onClick={() => setPageNumber(pageNumber - 1)}
            >
                Previous
            </button>
            <button
                className="btn waves-effect waves-light"
                disabled={totalMoviesCount / pageNumber < FILMS_PER_PAGE}
                onClick={() => setPageNumber(pageNumber + 1)}
            >
                Next
            </button>
        </div>
    );
}
