import { Navigate } from "react-router-dom";
import { useGlobalState } from "../../Context/GlobalStateContext";
import useForm from "../../Hooks/useForm";
import Button from "../Forms/Button";
import ErrorAlertMessage from "../Alerts/ErrorAlertMessage";
import Input from "../Forms/Input";

export default function RegisterForm() {
    let { login, userRegister, loading, error } = useGlobalState();

    if (login === true) {
        return <Navigate to="/profile" />;
    }

    const username = useForm("text");
    const email = useForm("email");
    const password = useForm("password");

    async function handleSubmit(event: any) {
        event.preventDefault();
        if (username && email && password) {
            userRegister(username.value, email.value, password.value);
        }
        error = "Something went wrong";
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <small>
                    <span id="alert_name" className="fw-bold text-danger"></span>
                </small>

                <div className="form-group mb-3">
                    <Input
                        minLength={4}
                        placeholder="Digit your username"
                        label="Digit your username"
                        type="text"
                        name="username"
                        {...username}
                    />
                </div>

                <small>
                    <span id="alert_email" className="fw-bold text-danger"></span>
                </small>

                <div className="form-group mb-3">
                    <Input
                        minLength={12}
                        placeholder="Digit your email"
                        label="Digit your email"
                        type="email"
                        name="email"
                        {...email}
                    />
                </div>

                <small>
                    <span id="alert_password" className="fw-bold text-danger"></span>
                </small>

                <div className="form-group mb-3">
                    <Input
                        minLength={8}
                        placeholder="Digit your password"
                        label="Digit your password"
                        type="password"
                        name="password"
                        {...password}
                    />
                </div>

                <div className="mb-3 mt-4 form-check">
                    <small>
                        <span id="alert_checkbox" className="fw-bold text-danger"></span>
                    </small>
                    <input type="checkbox" className="form-check-input" id="checkbox_policy" />
                    <label className="form-check-label" htmlFor="checkbox_policy">
                        <small>
                            By registering your account, you agree with our
                            <a target="_blank" href="/privacy">
                                {" "}
                                Privacy and Terms of Use Policy
                            </a>{" "}
                            and accept to receive newsletter offers and advertisements.
                        </small>
                    </label>
                </div>

                <div className="form-group">
                    {loading ? <Button disabled={true}>Processing...</Button> : <Button>Register Account</Button>}

                    <ErrorAlertMessage message={error && "Invalid email or passwords"} />
                </div>
            </form>

            <div className="text-center mt-5">
                <h4>Already have a account?</h4>
                <h4>
                    <a href="/auth" className="text-success text-decoration-none">
                        <b>Login</b>
                    </a>
                </h4>
            </div>
        </>
    );
}
