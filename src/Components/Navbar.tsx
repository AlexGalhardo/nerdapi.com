import { useLocation, useNavigate } from "react-router-dom";
import { useGlobalState } from "../Context/GlobalStateContext";
import { useState } from "react";

export default function Navbar() {
    const { user, userLogout } = useGlobalState();
    const navigate = useNavigate();
    const [search, setSearch] = useState<string | undefined>();
    const location = useLocation();

    function handleLogout() {
        userLogout();
        navigate("/login");
    }

    function handleSearch(event: any) {
        event.preventDefault();

        navigate(`/?search=${search}`);
    }

    return (
        <div className="fixed-top shadow bg-light mb-5 bg-dark">
            <nav className="container col-lg-10 navbar navbar-expand-lg fixed navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand appTitle" href="/">
                        <span className="fs-4 fw-bold navbarTitle">NerdAPI</span>
                    </a>

                    <form className="d-flex w-50" onSubmit={handleSearch}>
                        <div className="input-group">
                            <input
                                type="text"
                                name="search"
                                className="fs-6 form-control"
                                placeholder="Search game title..."
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </form>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse pull-right" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a
                                    className={`fs-5 nav-link fw-bold ${
                                        location.pathname === "/contact" ? "text-white" : undefined
                                    }`}
                                    aria-current="page"
                                    href="/contact"
                                >
                                    <i className="bi bi-envelope"></i> Contact
                                </a>
                            </li>

                            <li className="nav-item">
                                <a
                                    className={`fs-5 nav-link fw-bold ${
                                        location.pathname === "/pricing" ? "text-white" : undefined
                                    }`}
                                    aria-current="page"
                                    href="/pricing"
                                >
                                    {" "}
                                    <i className="bi bi-award"></i>
                                    Pricing
                                </a>
                            </li>

                            <li className="nav-item">
                                <a
                                    className="fs-5 nav-link fw-bold"
                                    aria-current="page"
                                    href="https://docs.nerdapi.com"
                                    target="_blank"
                                >
                                    <i className="bi bi-code"></i> API
                                </a>
                            </li>
                        </ul>

                        {user ? (
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 right">
                                <li className="nav-item dropdown">
                                    <a
                                        className="fs-5 fw-bold nav-link dropdown-toggle"
                                        href="#"
                                        id="navbarDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        {user.username ?? "Alex Galhardo"}
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li>
                                            <a className="fs-5 fw-bold dropdown-item" href="/profile">
                                                <i className="bi bi-person-circle"></i> Profile
                                            </a>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li>
                                            <a className="fs-5 fw-bold dropdown-item" onClick={handleLogout}>
                                                <i className="bi bi-x-lg"></i> Logout
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        ) : (
                            <div className="pull-right">
                                <a href="/login" className="button fw-bold fs-5 btn btn-outline-success" type="submit">
                                    <i className="bi bi-person-fill-lock"></i> Login
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}
