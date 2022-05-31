export function Paginator(props) {
    return (
        <div className="paginator">
            <button
                className="btn waves-effect waves-light"
                disabled={props.isFirst}
                onClick={() => props.swapPage(-1)}
            >
                Previous
            </button>
            <button
                className="btn waves-effect waves-light"
                disabled={props.isLast}
                onClick={() => props.swapPage(1)}
            >
                Next
            </button>
        </div>
    );
}
