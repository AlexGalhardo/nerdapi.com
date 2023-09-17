import { Navigate } from "react-router-dom";
import { useGlobalState } from "../../Context/GlobalStateContext";
import Button from "../Forms/Button";
import ErrorAlertMessage from "../Alerts/ErrorAlertMessage";
import { useState } from "react";

export default function RegisterForm() {
    let { login, userRegister, loading, apiRequestError } = useGlobalState();
    const [isChecked, setIsChecked] = useState(false);
    const [username, setUsername] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [errorCheckBox, setErrorCheckBox] = useState(false);
    const [errorUsername, setErrorUsername] = useState<string>();
    const [errorEmail, setErrorEmail] = useState<string>();
    const [errorPassword, setErrorPassword] = useState<string>();

    if (login === true) {
        return <Navigate to="/profile" />;
    }

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    function isValidSingleName(name: string): boolean {
        if (!name || name.length <= 3) return false;
        const regexOfValidNamesWithAcents = /^[a-zA-ZÀ-ú]+$/g;
        return regexOfValidNamesWithAcents.test(name);
    }

    function isValidUserName(fullName: string): boolean {
        const names = fullName.split(" ");
        if (names.length > 1) {
            for (const name of names) {
                if (!isValidSingleName(name)) return false;
            }
        } else {
            if (!isValidSingleName(fullName)) return false;
            return true;
        }
        return true;
    }

    function isValidEmail(email: string): boolean {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    }

    async function handleSubmit(event: any) {
        event.preventDefault();

        if (!isChecked) {
            setErrorCheckBox(true);
        } else {
            setErrorCheckBox(false);

            if (username && !isValidUserName(username)) {
                setErrorUsername("Invalid username");
            } else if (email && !isValidEmail(email)) {
                setErrorUsername("");
                setErrorEmail("Invalid email");
            } else if (password) {
                setErrorUsername("");
                setErrorEmail("");
                const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
                const uppercaseRegex = /[A-Z]/;
                const numberRegex = /[0-9]/;

                const securePassword =
                    specialCharRegex.test(password) && uppercaseRegex.test(password) && numberRegex.test(password);

                if (password.length < 12) {
                    setErrorPassword("Password must has at least 12 characters");
                } else if (!securePassword) {
                    setErrorPassword("Password must has at least 1 upperCase, 1 number and 1 special character");
                } else {
                    setErrorPassword("");
                }
            }

            if (username && email && password && !errorUsername && !errorEmail && !errorPassword && !errorCheckBox) {
                userRegister(username, email, password);
            }
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

                <form onSubmit={handleSubmit}>
                    <small>
                        <span id="alert_name" className="fw-bold text-danger"></span>
                    </small>

                    <div className="form-group mb-3">
                        <label htmlFor="username" className="text-muted mt-3">
                            Digit Your Username
                        </label>
                        <input
                            className="fs-4 form-control"
                            minLength={4}
                            placeholder="Digit your username"
                            type="text"
                            name="username"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        {errorUsername && (
                            <small>
                                <span className="fw-bold text-danger">Username invalid</span>
                            </small>
                        )}
                    </div>

                    <small>
                        <span id="alert_email" className="fw-bold text-danger"></span>
                    </small>

                    <div className="form-group mb-3">
                        <label htmlFor="email" className="text-muted mt-3">
                            Digit Your Email
                        </label>
                        <input
                            className="fs-4 form-control"
                            minLength={8}
                            placeholder="Digit your email"
                            type="email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {errorEmail && (
                            <small>
                                <span className="fw-bold text-danger">Email invalid</span>
                            </small>
                        )}
                    </div>

                    <small>
                        <span id="alert_password" className="fw-bold text-danger"></span>
                    </small>

                    <div className="form-group mb-3">
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
                        {errorPassword && (
                            <small>
                                <span className="fw-bold text-danger">{errorPassword}</span>
                            </small>
                        )}
                    </div>

                    <div className="mb-3 mt-4 form-check">
                        <label className="form-check-label" htmlFor="checkbox_policy">
                            <small>
                                You agree with our
                                <a target="_blank" href="/privacy">
                                    {" "}
                                    Privacy and Terms of Use Policy
                                </a>{" "}
                            </small>
                        </label>
                        <input
                            type="checkbox"
                            className="form-check-input"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                        />
                        {errorCheckBox && (
                            <small>
                                <span className="fw-bold text-danger">
                                    <br />
                                    You need to agree with our terms to register account.
                                </span>
                            </small>
                        )}
                    </div>

                    <div className="form-group">
                        {loading ? <Button disabled={true}>Processing...</Button> : <Button>Register Account</Button>}

                        {apiRequestError && <ErrorAlertMessage message={apiRequestError} />}
                    </div>
                </form>

                <div className="text-center mt-5">
                    <h4>Already have a account?</h4>
                    <h4>
                        <a href="/login" className="text-success text-decoration-none">
                            <b>Login</b>
                        </a>
                    </h4>
                </div>
            </div>
        </>
    );
}
