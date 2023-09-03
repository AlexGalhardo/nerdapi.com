import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../Context/GlobalStateContext";

export default function Navbar() {
    const { globalState, userLogout } = useGlobalState();
    const navigate = useNavigate();

    function handleLogout() {
        userLogout();
        navigate("/auth");
    }

    return (
        <div className="fixed-top shadow bg-light mb-5">
            <nav className="container pt-2 pb-2 col-lg-8 navbar navbar-expand-lg fixed navbar-light">
                <div className="container-fluid">
                    <a className="navbar-brand appTitle" href="/">
                        <span className="fs-4 fw-bold navbarTitle">Galhardo MicroSaaS</span>
                    </a>

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

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="fs-5 nav-link fw-bold" aria-current="page" href="/blog">
                                    Blog
                                </a>
                            </li>

                            <li className="nav-item">
                                <a className="fs-5 nav-link fw-bold" aria-current="page" href="/contact">
                                    Contact
                                </a>
                            </li>

                            <li className="nav-item">
                                <a className="fs-5 nav-link fw-bold" aria-current="page" href="/pricing">
                                    {" "}
                                    Pricing
                                </a>
                            </li>

                            <li className="nav-item">
                                <a
                                    className="fs-5 nav-link fw-bold"
                                    aria-current="page"
                                    href="https://nerdapi.com"
                                    target="_blank"
                                >
                                    {" "}
                                    API
                                </a>
                            </li>

							<li className="nav-item">
                                <a
                                    className="fs-5 nav-link fw-bold"
                                    aria-current="page"
                                    href="https://github.com/AlexGalhardo/Galhardo-MicroSaaS"
                                    target="_blank"
                                >
                                    {" "}
                                    Source Code
                                </a>
                            </li>
                        </ul>

                        {globalState.USER.LOGGED_IN ? (
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 right">
                                <li className="nav-item dropdown">
                                    <a
                                        className="fs-4 fw-bold nav-link dropdown-toggle"
                                        href="#"
                                        id="navbarDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        {globalState.USER.NAME}
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li>
                                            <a className="fs-5 fw-bold dropdown-item" href="/profile">
                                                <i className="bi bi-person-circle"></i> Profile
                                            </a>
                                        </li>
                                        <li>
                                            <a className="fs-5 fw-bold dropdown-item" href="/profile/transactions">
                                                <i className="bi bi-award"></i> Transactions
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
                                <a href="/auth" className="button fw-bold fs-5 btn btn-outline-success" type="submit">
                                    Login
                                </a>

                                <a
                                    href="/auth/register"
                                    className="button fw-bold fs-5 ms-2 btn btn-outline-primary"
                                    type="submit"
                                >
                                    Sign Up
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}
