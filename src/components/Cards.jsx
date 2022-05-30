import { Card } from "./Card";

export function Cards(props) {
    return (
        <div className="grid-content">
            {props.movies.map((film) => {
                return (
                    <div key={film.imdbID} className="grid-row">
                        <Card {...film} showDetails={props.showDetails} />
                    </div>
                );
            })}
        </div>
    );
}
