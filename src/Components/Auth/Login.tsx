import { Navigate } from "react-router-dom";
import { useGlobalState } from "../../Context/GlobalStateContext";
import Button from "../Forms/Button";
import ErrorAlertMessage from "../Alerts/ErrorAlertMessage";
import { API_URL } from "../../Utils/Envs";
import { useState } from "react";

export default function LoginForm() {
    const { userLogin, error, loading, login } = useGlobalState();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    if (login === true) {
        return <Navigate to="/profile" />;
    }

    async function handleSubmit(event: any) {
        event.preventDefault();

        if (email && password) {
            userLogin(email, password);
        }
    }

    return (
        <>
            <div className="container col-lg-3 mt-5">
                <h1 className="text-center text-muted mb-4">
                    <a className="text-decoration-none" href="/">
                        <b className="fw-bold text-primary">NerdAPI</b>
                    </a>
                </h1>

                <div
                    id="g_id_onload"
                    data-client_id="944810954683-ahhpp7q8ndotmd10f96ri6es0kpv2nh1.apps.googleusercontent.com"
                    data-context="signin"
                    data-login_uri={`${API_URL}/login/google/callback`}
                    data-locale="en"
                ></div>

                <a
                    href="https://github.com/login/oauth/authorize?client_id=dc8d30a5f12828c5d3f9"
                    className="fs-4 fw-bold button btn-lg btn btn-outline-secondary w-100"
                >
                    <i className="bi bi-github me-2"></i>
                    Login with GitHub
                </a>

                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-4 mt-5">
                        <label htmlFor="email" className="text-muted mt-3">
                            Digit Your Email
                        </label>
                        <input
                            className="fs-4 form-control"
                            placeholder="Digit your email"
                            minLength={8}
                            type="email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group mb-4">
                        <label htmlFor="password" className="text-muted mt-3">
                            Digit Your Password
                        </label>
                        <input
                            className="fs-4 form-control"
                            minLength={12}
                            placeholder="Digit your password"
                            type="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {loading ? <Button disabled={true}>Processing...</Button> : <Button>Login</Button>}

                    <ErrorAlertMessage message={error && "Email and/or Password Invalid"} />
                </form>

                <div className="text-center mt-5">
                    <p className="text-center mb-3 mt-3">
                        <a href="/forget-password" className="text-decoration-none">
                            <b>Forget My Password</b>
                        </a>
                    </p>

                    <p>
                        <a href="/register" className="text-success text-decoration-none">
                            <b>Register Account</b>
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}
