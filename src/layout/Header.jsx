export function Header() {
    return (
        <nav className="light-blue lighten-2">
            <div className="nav-wrapper">
                <a
                    href={
                        window.location.hostname === "igorpekarskij.github.io"
                            ? "/movies"
                            : "/"
                    }
                    className="brand-logo"
                >
                    Movies
                </a>
            </div>
        </nav>
    );
}
