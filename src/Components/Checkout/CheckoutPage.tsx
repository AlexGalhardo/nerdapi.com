import { useGlobalState } from "../../Context/GlobalStateContext";
import { Navigate, useParams } from "react-router-dom";
import CheckoutCasual from "./CheckoutCasual";
import CheckoutPro from "./CheckoutPro";

export default function CheckoutPage() {
    const { login } = useGlobalState();

    if (login === false) {
        return <Navigate to="/auth" />;
    }

    const { slug } = useParams();

    console.log("slug é ==> ", slug);

    return (
        <div className="container col-lg-6 mt-5">
            <div className="row">
                <h2 className="text-center text-muted mb-4">
                    <a className="text-decoration-none" href="/">
                        <b className="appTitle fw-bold text-primary">Galhardo MicroSaaS</b>
                    </a>
                </h2>

                <form />

                <div className="row">
                    {slug === "casual" && <CheckoutCasual />}

                    {slug === "pro" && <CheckoutPro />}

                    {slug !== "pro" && slug !== "casual" && <Navigate to="/pricing" />}
                </div>

                <div className="col-lg-12 text-center text-muted">
                    <small>&copy; Galhardo MicroSaaS 2023</small>
                </div>
            </div>
        </div>
    );
}
