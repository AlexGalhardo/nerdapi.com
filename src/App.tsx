import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStateProvider } from "./Context/GlobalStateContext";
import Games from "./Pages/Games";
import ProgressBar from "./Components/ProgressBar";
import Contact from "./Pages/Contact";
import Pricing from "./Pages/Pricing";
import Checkout from "./Components/Checkout/Checkout";
import NotFound from "./Components/NotFound";
import Profile from "./Components/Profile/Profile";
import Auth from "./Components/Auth/Auth";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Style.css";
import Privacy from "./Pages/Privacy";

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
                    <Route path="/auth/*" element={<Auth />} />
                    <Route path="/profile/*" element={<Profile />} />
					<Route path="/privacy/*" element={<Privacy />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </GlobalStateProvider>
        </BrowserRouter>
    );
}
