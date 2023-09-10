import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from "../NotFound";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgetPasswordForm from "./ForgetPasswordForm";
import ResetPasswordForm from "./ResetPasswordForm";
import { useGlobalState } from "../../Context/GlobalStateContext";

const Login = () => {
    const { login } = useGlobalState();

    if (login === true) return <Navigate to="/profile" />;

    return (
        <div className="container col-lg-3 mt-5">
            <h1 className="text-center text-muted mb-4">
                <a className="text-decoration-none" href="/">
                    <b className="fw-bold text-primary">NerdAPI</b>
                </a>
            </h1>

            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="register" element={<RegisterForm />} />
                <Route path="forget-password" element={<ForgetPasswordForm />} />
                <Route path="reset-password/:reset_password_token" element={<ResetPasswordForm />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
};

export default Login;
