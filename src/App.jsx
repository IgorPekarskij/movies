import { Footer } from "./layout/Footer";
import { Header } from "./layout/Header";
import { Main } from "./layout/Main";
import { Context } from "./context/FilmsContext";

function App() {
    return (
        <>
            <Context>
                <Header />
                <Main />
                <Footer />
            </Context>
        </>
    );
}

export default App;
