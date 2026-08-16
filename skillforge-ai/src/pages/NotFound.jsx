import {Link} from "react-router-dom";

function NotFound() {
    return(
        <main className="page-center">
            <div className="page-card">
                <h1>404</h1>
                <p>Page not found.</p>
                <Link to="/">GoHome</Link>
            </div>
        </main>
    );
}

export default NotFound;