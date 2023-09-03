import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStateProvider } from "./Context/GlobalStateContext";
// import Footer from "./Components/Footer"
import Games from "./Pages/Games";
import Books from "./Pages/Books";
import Movies from "./Pages/Movies";
import ProgressBar from "./Components/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Style.css";
import Blog from "./Components/Blog/Blog";
import BlogPost from "./Components/Blog/BlogPost";
import Contact from "./Pages/Contact";
import Pricing from "./Pages/Pricing";
import Checkout from "./Components/Checkout";
import NotFound from "./Components/NotFound";
import Profile from "./Components/Profile/Profile";
import Auth from "./Components/Auth/Auth";
import TVShows from "./Pages/TVShows";

export default function App() {
    return (
        <BrowserRouter>
            <GlobalStateProvider>
				<ProgressBar />
				<Routes>
					<Route path="/" element={<Games />} />
					<Route path="/books" element={<Books />} />
					<Route path="/movies" element={<Movies />} />
					<Route path="/tvshows" element={<TVShows />} />
					<Route path="/blog/*" element={<Blog />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/pricing" element={<Pricing active={true} />} />
					<Route path="/checkout" element={<Checkout />} />
					<Route path="/auth/*" element={<Auth />} />
					<Route path="/profile/*" element={<Profile />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
            </GlobalStateProvider>
        </BrowserRouter>
    );
}
