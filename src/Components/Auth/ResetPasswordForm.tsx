import { Navigate, useParams } from "react-router-dom";
import { useGlobalState } from "../../Context/GlobalStateContext";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import SuccessAlertMessage from "../Alerts/SuccessAlertMessage";
import ErrorAlertMessage from "../Alerts/ErrorAlertMessage";
import useForm from "../../Hooks/useForm";

export default function ResetPasswordForm() {
    const { login, loading, resetPassword, sendResetPassword, error, isValidResetPasswordToken } = useGlobalState();

    if (login === true) {
        return <Navigate to="/profile" />;
    }

    const { reset_password_token } = useParams();

    if (reset_password_token) {
        isValidResetPasswordToken(reset_password_token);
    }

    const newPassword = useForm("password");
    const confirmNewPassword = useForm("password");

    async function handleSubmit(event: any) {
        event.preventDefault();
        await resetPassword(reset_password_token as string, newPassword.value, confirmNewPassword.value);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-4 mt-5">
                    <Input
                        minLength={12}
                        placeholder="Digit your new password"
                        label="Digit your new password"
                        type="password"
                        name="password"
                        {...newPassword}
                    />

                    <Input
                        minLength={12}
                        placeholder="Confirm your new password"
                        label="Confirm your new password"
                        type="password"
                        name="password"
                        {...confirmNewPassword}
                    />
                </div>

                {loading ? <Button disabled={true}>Processing...</Button> : <Button>Reset My Password</Button>}

                <SuccessAlertMessage message={sendResetPassword && "You password was changed!"} />

                <ErrorAlertMessage message={error && "Invalid email or/and password"} />
            </form>
        </>
    );
}
