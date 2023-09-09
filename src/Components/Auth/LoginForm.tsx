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
            <div
                id="g_id_onload"
                data-client_id="944810954683-ahhpp7q8ndotmd10f96ri6es0kpv2nh1.apps.googleusercontent.com"
                data-context="signin"
                data-ux_mode="popup"
                data-login_uri={`${API_URL}/callback/google/login`}
                data-nonce=""
                data-auto_select="true"
                data-itp_support="true"
            ></div>

            <div
                className="g_id_signin"
                data-type="standard"
                data-shape="rectangular"
                data-theme="outline"
                data-text="signin_with"
                data-size="large"
                data-logo_alignment="left"
                data-width="400px"
            ></div>

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

                <ErrorAlertMessage message={error && "Invalid email or/and password"} />
            </form>

            <div className="text-center mt-5">
                <p className="text-center mb-3 mt-3">
                    <a href="/auth/forgetPassword" className="text-decoration-none">
                        <b>Forget My Password</b>
                    </a>
                </p>

                <p>
                    <a href="/auth/register" className="text-success text-decoration-none">
                        <b>Register Account</b>
                    </a>
                </p>
            </div>
        </>
    );
}
