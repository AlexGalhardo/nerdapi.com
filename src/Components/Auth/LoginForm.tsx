import { Navigate } from "react-router-dom";
import { useGlobalState } from "../../Context/GlobalStateContext";
import useForm from "../../Hooks/useForm";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import ErrorAlertMessage from "../Alerts/ErrorAlertMessage";
import { API_URL } from "../../Utils/Envs";

export default function LoginForm() {
    const { userLogin, error, loading, login } = useGlobalState();

    if (login === true) {
        return <Navigate to="/profile" />;
    }

    const email = useForm("email");
    const password = useForm("password");

    async function handleSubmit(event: any) {
        event.preventDefault();

        if (email.validate() && password.validate()) {
            userLogin(email.value, password.value);
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
                        <Input
                            minLength={12}
                            placeholder="Digit your email"
                            label="Digit your email"
                            type="email"
                            name="email"
                            {...email}
                        />
                    </div>

                    <div className="form-group mb-4">
                        <Input
                            minLength={8}
                            placeholder="Digit your password"
                            label="Digit your password"
                            type="password"
                            name="password"
                            {...password}
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
