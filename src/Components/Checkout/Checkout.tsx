import { Route, Routes } from "react-router-dom";
import Footer from "../Footer";
import Navbar from "../Navbar";
import NotFound from "../NotFound";
import CheckoutPage from "./CheckoutPage";

export default function Checkout() {
    return (
        <>
            <Navbar />

            <main className="container col-lg-8 mt-5">
                <div className="row">
                    <Routes>
                        <Route path="/:slug" element={<CheckoutPage />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </main>

            <Footer />
        </>
    );
}
