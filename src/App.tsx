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
import Blog from "./Pages/Blog";
import BlogPost from "./Pages/BlogPost";
import Contact from "./Pages/Contact";
import Pricing from "./Pages/Pricing";
import Checkout from "./Components/Checkout";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import NotFound from "./Pages/NotFound";
import Profile from "./Pages/Profile";
// import { UserStateProvider } from "./Context/UserStateContext";
import Logout from "./Pages/Logout";

export default function App() {
    return (
        <BrowserRouter>
            <GlobalStateProvider>
                {/* <UserStateProvider> */}
                    <ProgressBar />
                    <Routes>
                        <Route path="/" element={<Games />} />
                        <Route path="/books" element={<Books />} />
                        <Route path="/movies" element={<Movies />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blogPost" element={<BlogPost />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/pricing" element={<Pricing active={true} />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/profile" element={<Profile />} />
						<Route path="/logout" element={<Logout />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                {/* </UserStateProvider> */}
            </GlobalStateProvider>
        </BrowserRouter>
    );
}
