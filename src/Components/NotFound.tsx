import Footer from "./Footer";
import Navbar from "./Navbar";
import notfound from '../Assets/notfound.png'

export default function NotFound() {
    return (
        <>
            <Navbar />
            	<img className="mt-5" src={notfound} />
            <Footer />
        </>
    );
}
