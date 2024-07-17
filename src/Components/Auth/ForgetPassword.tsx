import { Navigate } from "react-router-dom";
import { useGlobalState } from "../../Context/GlobalStateContext";
import Button from "../Forms/Button";
import SuccessAlertMessage from "../Alerts/SuccessAlertMessage";
import { useState } from "react";

export default function ForgetPasswordForm() {
    const { forgetPassword, sendRecoverPassword, loading, login } = useGlobalState();
    const [email, setEmail] = useState<string>();
    const [errorEmail, setErrorEmail] = useState<string>();

    if (login === true) return <Navigate to="/profile" />;

    function isValidEmail(email: string): boolean {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    }

    async function handleSubmit(event: any) {
        event.preventDefault();

        if (email && !isValidEmail(email)) {
            setErrorEmail("Invalid Email");
        } else if (email && isValidEmail(email)) {
            setErrorEmail("");
            await forgetPassword(email);
            setEmail("");
        }
    }

    return (
        <>
            <div className="container col-lg-3 mt-5">
                <h1 className="text-center text-white mb-4">
                    <a className="text-decoration-none" href="/">
                        <b className="fw-bold text-primary">Games</b>
                    </a>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-4 mt-5">
                        <label htmlFor="email" className="text-white mt-3">
                            Digit Your Email
                        </label>
                        <input
                            className="fs-4 form-control"
                            placeholder="Digit your email"
                            minLength={8}
                            value={email}
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

                    {loading ? (
                        <Button disabled={true}>Processing...</Button>
                    ) : (
                        <Button>Send me a email to recover password</Button>
                    )}

                    <SuccessAlertMessage
                        message={
                            sendRecoverPassword &&
                            "If this email exists, a email was send with a link to recover password!"
                        }
                    />
                </form>
            </div>
        </>
    );
}
