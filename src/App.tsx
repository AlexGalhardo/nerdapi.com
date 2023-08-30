import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStateProvider } from "./Context/GlobalStateContext";
// import Footer from "./Components/Footer"
import Games from "./Pages/Games"
import Books from "./Pages/Books"
import Movies from "./Pages/Movies"
import ProgressBar from "./Components/ProgressBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./Style.css";
import Navbar from "./Components/Navbar";
import Blog from "./Pages/Blog";
import Contact from "./Pages/Contact";
import Pricing from "./Pages/Pricing";
import Footer from "./Components/Footer";
import Checkout from "./Components/Checkout";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

export default function App() {
	return (
		<BrowserRouter>
			<GlobalStateProvider>
				<ProgressBar />
				<Routes>
					<Route path="/" element={<Games />} />
					<Route path="/books" element={<Books />} />
					<Route path="/movies" element={<Movies />} />
					<Route path="/blog" element={<Blog />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/pricing" element={<Pricing active={true} />} />
					<Route path="/checkout" element={<Checkout />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			</GlobalStateProvider>
		</BrowserRouter>
	);
}
