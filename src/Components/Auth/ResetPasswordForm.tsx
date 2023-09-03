import { Navigate } from "react-router-dom";
import { useGlobalState } from "../../Context/GlobalStateContext";
import Footer from "../Footer";
import Navbar from "../Navbar";

export default function ResetPasswordForm() {
    const { login } = useGlobalState();

    if (login === true) return <Navigate to="/profile" />;

    return (
        <>
            <Navbar />
            	<h2 className="mt-5">Reset Password page</h2>
            <Footer />
        </>
    );
}
