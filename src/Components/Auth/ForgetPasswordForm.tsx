import { Navigate } from "react-router-dom";
import { useGlobalState } from "../../Context/GlobalStateContext";
import useForm from "../../Hooks/useForm";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import ErrorAlertMessage from "../Alerts/ErrorAlertMessage";
import SuccessAlertMessage from "../Alerts/SuccessAlertMessage";

export default function ForgetPasswordForm() {
    const { forgetPassword, sendRecoverPassword, loading, login, error } = useGlobalState();

    if (login === true) return <Navigate to="/profile" />;

    const email = useForm("email");

    async function handleSubmit(event: any) {
        event.preventDefault();

        if (email.validate()) {
            await forgetPassword(email.value);
            email.setValue("");
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-4 mt-5">
                    <Input
                        minLength={12}
                        placeholder="Digit your email to recover password"
                        label="Digit your email"
                        type="email"
                        name="email"
                        {...email}
                    />
                </div>

                {loading ? (
                    <Button disabled={true}>Processing...</Button>
                ) : (
                    <Button>Send me a email to recover password</Button>
                )}

                <SuccessAlertMessage
                    message={
                        sendRecoverPassword && "If this email exists, a email was send with a link to recover password!"
                    }
                />

                <ErrorAlertMessage message={error && "Invalid email or/and password"} />
            </form>
        </>
    );
}
