import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStateProvider } from "./Context/GlobalStateContext";
import Games from "./Pages/RandomGame";
import ProgressBar from "./Components/ProgressBar";
import Contact from "./Pages/Contact";
import Pricing from "./Pages/Pricing";
import Checkout from "./Components/Checkout/Checkout";
import NotFound from "./Components/NotFound";
import Profile from "./Components/Profile/Profile";
import Privacy from "./Pages/Privacy";
import LoginForm from "./Components/Auth/Login";
import RegisterForm from "./Components/Auth/Register";
import ForgetPasswordForm from "./Components/Auth/ForgetPassword";
import ResetPasswordForm from "./Components/Auth/ResetPassword";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Style.css";
import Developer from "./Pages/Developer";
import Publisher from "./Pages/Publisher";
import Genre from "./Pages/Genre";
import Platform from "./Pages/Platform";
import RandomGame from "./Pages/RandomGame";
import Game from "./Pages/Game";

export default function App() {
    return (
        <BrowserRouter>
            <GlobalStateProvider>
                {/* <ProgressBar /> */}
                <Routes>
                    <Route path="/" element={<RandomGame />} />
                    <Route path="/games/*" element={<Games />} />
                    <Route path="/developer/:developer_name" element={<Developer />} />
                    <Route path="/publisher/:publisher_name" element={<Publisher />} />
                    <Route path="/genre/:genre_name" element={<Genre />} />
                    <Route path="/platform/:platform_name" element={<Platform />} />
                    <Route path="/game/:game_title_slug" element={<Game />} />
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
