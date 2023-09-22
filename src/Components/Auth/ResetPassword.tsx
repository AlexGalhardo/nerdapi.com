import { Navigate, useParams } from "react-router-dom";
import { useGlobalState } from "../../Context/GlobalStateContext";
import Button from "../Forms/Button";
import ErrorAlertMessage from "../Alerts/ErrorAlertMessage";
import { useState } from "react";
import SuccessAlertMessage from "../Alerts/SuccessAlertMessage";

export default function ResetPasswordForm() {
    const { login, loading, resetPassword, sendResetPassword, isValidResetPasswordToken } = useGlobalState();
    const [newPassword, setNewPassword] = useState<string>();
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>();
    const [newPasswordError, setNewPasswordError] = useState<string>();
    const { reset_password_token } = useParams();

    if (login === true) {
        return <Navigate to="/profile" />;
    }

    if (reset_password_token) {
        isValidResetPasswordToken(reset_password_token);
    } else {
        return <Navigate to="/" />;
    }

    async function handleSubmit(event: any) {
        event.preventDefault();

        console.log("newPassword !== confirmNewPassword => ", newPassword !== confirmNewPassword);

        let securePassword = null;

        if (newPassword !== confirmNewPassword) {
            setNewPasswordError("Passwords are not equal");
        } else if (newPassword) {
            const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
            const uppercaseRegex = /[A-Z]/;
            const numberRegex = /[0-9]/;

            securePassword =
                specialCharRegex.test(newPassword) && uppercaseRegex.test(newPassword) && numberRegex.test(newPassword);

            if (newPassword.length < 12) {
                setNewPasswordError("Password must has at least 12 characters");
            } else if (!securePassword) {
                setNewPasswordError("Password must has at least 1 upperCase, 1 number and 1 special character");
            } else {
                setNewPasswordError(undefined);
            }
        }

        if (newPassword && confirmNewPassword && !newPasswordError && securePassword) {
            setNewPasswordError("");
            resetPassword(reset_password_token as string, newPassword, confirmNewPassword);
        }
    }

    return (
        <>
            <div className="container col-lg-3 mt-5">
                <h1 className="text-center text-white mb-4">
                    <a className="text-decoration-none" href="/">
                        <b className="fw-bold text-primary">NerdAPI</b>
                    </a>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-4 mt-5">
                        <label htmlFor="username" className="text-white mt-3">
                            Digit your new password
                        </label>
                        <input
                            className="fs-4 form-control"
                            minLength={12}
                            placeholder="Digit your new password"
                            type="password"
                            name="newPassword"
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />

                        <label htmlFor="username" className="text-white mt-3">
                            Confirm your new password
                        </label>
                        <input
                            className="fs-4 form-control"
                            minLength={12}
                            placeholder="Confirm your new password"
                            type="password"
                            name="confirmNewPassword"
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            required
                        />
                    </div>

                    {newPasswordError && <ErrorAlertMessage message={newPasswordError} />}

                    {sendResetPassword && (
                        <SuccessAlertMessage message={"Password changed! Redirecting to home page..."} />
                    )}

                    {loading ? <Button disabled={true}>Processing...</Button> : <Button>Change My Password</Button>}
                </form>
            </div>
        </>
    );
}
