import Footer from "../Footer";
import Navbar from "../Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import { useGlobalState } from "../../Context/GlobalStateContext";
import ProfileUser from "./ProfileUser";
import ProfileTransactions from "./ProfileTransactions";
import NotFound from "../NotFound";

export default function Profile() {
	const { login } = useGlobalState();

    if (login === false) {
		return <Navigate to="/auth" />;
	}

    return (
        <>
            <Navbar />

            <main className="container col-lg-12 mt-5 mb-5">

                <div className="row">

                    <Routes>
                        <Route path="/" element={<ProfileUser />} />
                        <Route path="transactions" element={<ProfileTransactions />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>

                </div>

            </main>

            <Footer />
        </>
    );
}
