import Footer from "../Footer";
import Navbar from "../Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import { useGlobalState } from "../../Context/GlobalStateContext";
import ProfileUser from "./ProfileUser";
import NotFound from "../NotFound";
import Head from "../Head";
import HeadScript from "../HeadScript";

export default function Profile() {
    const { login } = useGlobalState();

	if (login === false) {
		return <Navigate to="/auth" />;
    }

    return (
        <>
			<Head title="Profile" description="My Profile"/>
			<HeadScript url="https://cdn.jsdelivr.net/npm/clipboard@2.0.11/dist/clipboard.min.js"/>
            <Navbar />

            <main className="container col-lg-12 mt-5 mb-5">
                <div className="row">
                    <Routes>
                        <Route path="/" element={<ProfileUser />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </main>

            <Footer />
        </>
    );
}
