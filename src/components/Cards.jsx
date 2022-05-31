import { Card } from "./Card";
import { Paginator } from "./Paginator";

export function Cards(props) {
    return (
        <>
            <div className="grid-content">
                {props.movies.map((film) => {
                    return (
                        <div key={film.imdbID} className="grid-row">
                            <Card {...film} showDetails={props.showDetails} />
                        </div>
                    );
                })}
            </div>
            <Paginator
                isLast={props.isLast}
                isFirst={props.isFirst}
                swapPage={props.swapPage}
            />
        </>
    );
}
