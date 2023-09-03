import { Route, Routes } from "react-router-dom";
import Footer from "../Footer";
import Navbar from "../Navbar";
import NotFound from "../NotFound";
import BlogHome from "./BlogHome";
import BlogPost from "./BlogPost";

export default function Blog() {
    return (
        <>
            <Navbar />

            <main className="container col-lg-8 mt-5">
                <div className="row">
                    <Routes>
                        <Route path="/" element={<BlogHome />} />
                        <Route path="/:slug" element={<BlogPost />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </main>

            <Footer />
        </>
    );
}
