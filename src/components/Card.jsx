export function Card(props) {
    const {
        Title: title,
        Poster: poster,
        imdbID: id,
        Type: type,
        Year: year,
    } = props;
    return (
        <div className="row">
            <div className="col s12 m12">
                <div className="card large">
                    <div className="card-image">
                        {poster === "N/A" ? (
                            <img
                                src={`https://via.placeholder.com/300x400?text=${title}`}
                                alt={title}
                            />
                        ) : (
                            <img src={poster} alt={title} />
                        )}
                    </div>
                    <div className="card-content">
                        <strong>{title}</strong>
                        <hr />
                        <p>
                            Year: {year}{" "}
                            <span className="right">Type: {type}</span>
                        </p>
                    </div>
                    <div className="card-action">
                        <a
                            href="!#"
                            onClick={(event) => {
                                event.preventDefault();
                                props.showDetails(id);
                            }}
                        >
                            Movie Details
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
