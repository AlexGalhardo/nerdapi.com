import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStateProvider } from "./Context/GlobalStateContext";
import Games from "./Pages/Games";
import ProgressBar from "./Components/ProgressBar";
import Contact from "./Pages/Contact";
import Pricing from "./Pages/Pricing";
import Checkout from "./Components/Checkout/Checkout";
import NotFound from "./Components/NotFound";
import Profile from "./Components/Profile/Profile";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Style.css";
import Privacy from "./Pages/Privacy";
import LoginForm from "./Components/Auth/LoginForm";
import RegisterForm from "./Components/Auth/RegisterForm";
import ForgetPasswordForm from "./Components/Auth/ForgetPasswordForm";
import ResetPasswordForm from "./Components/Auth/ResetPasswordForm";

export default function App() {
    return (
        <BrowserRouter>
            <GlobalStateProvider>
                <ProgressBar />
                <Routes>
                    <Route path="/" element={<Games />} />
                    <Route path="/games/*" element={<Games />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/checkout/*" element={<Checkout />} />
                    <Route path="/profile/*" element={<Profile />} />
                    <Route path="/privacy/*" element={<Privacy />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/forget-password" element={<ForgetPasswordForm />} />
                    <Route path="/reset-password/:reset_password_token" element={<ResetPasswordForm />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </GlobalStateProvider>
        </BrowserRouter>
    );
}
