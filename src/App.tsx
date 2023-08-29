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

export default function App() {
	return (
		<BrowserRouter>
			<GlobalStateProvider>
				<ProgressBar />
				<Navbar />
				<Routes>
					<Route path="/" element={<Games />} />
					<Route path="/books" element={<Books />} />
					<Route path="/movies" element={<Movies />} />
				</Routes>
				{/* <Footer /> */}
			</GlobalStateProvider>
		</BrowserRouter>
	);
}
