import { CSSProperties } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { API_URL } from "../Utils/Envs";
import Head from "../Components/Head";

export default function Pricing() {
    const handleSubmitCasual = async (e: any) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/stripe/create-checkout-session`, {
                method: "POST",
                body: JSON.stringify({
                    lookup_key: "plan_casual",
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                },
            });

            if (response.ok) {
                const json = await response.json();

                if (json.redirect) {
                    window.location.href = json.redirect;
                } else {
                    console.error("Response does not contain a redirect URL.");
                }
            } else {
                console.error("Error:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleSubmitPro = async (e: any) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/stripe/create-checkout-session`, {
                method: "POST",
                body: JSON.stringify({
                    lookup_key: "plan_pro",
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                },
            });

            if (response.ok) {
                const json = await response.json();

                if (json.redirect) {
                    window.location.href = json.redirect;
                } else {
                    console.error("Response does not contain a redirect URL.");
                }
            } else {
                console.error("Error:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            <Head title="Pricing" description="See ours plans to get access to NerdAPI!" />
            <Navbar />
            <div className="container col-lg-7" style={containerPricing}>
                <div className="row">
                    <div className="pricing-header p-3 pb-md-4 text-center mt-5">
                        <p className="fs-3">
                            Elevate your development experience with our subscription plans for access to a vast library
                            of games, books, movies and TV Shows through our API. Dive into a world of endless
                            entertainment options, from the latest blockbuster films to best-selling novels and
                            captivating video games. With our user-friendly interface and lightning-fast API, you'll
                            have instant access to the ultimate source of digital entertainment.
                        </p>
                    </div>

                    <main>
                        <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
                            <div className="col">
                                <div className="card mb-4 rounded-3 shadow">
                                    <div className="card-header py-3 bg-success">
                                        <h4 className="my-0 fw-bold text-white">Noob</h4>
                                    </div>
                                    <div className="card-body">
                                        <h1 className="card-title pricing-card-title">
                                            $0<small className="text-muted fw-light">/month</small>
                                        </h1>
                                        <ul className="list-unstyled mt-3 mb-4">
                                            <li>No Access API KEY</li>
                                            <li>Website Limited Recomendations</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card mb-4 rounded-3 shadow border-danger">
                                    <div className="card-header py-3 bg-danger">
                                        <h4 className="my-0 fw-bold text-white">
                                            <i className="bi bi-award"></i> Casual
                                        </h4>
                                    </div>
                                    <div className="card-body">
                                        <h1 className="card-title pricing-card-title">
                                            $1.99<small className="text-muted fw-light">/month</small>
                                        </h1>
                                        <ul className="list-unstyled mt-3 mb-4">
                                            <li>Access to API KEY</li>
                                            <li>1000 API Requests Day</li>
                                            <li>Priority Email Support</li>
                                        </ul>
                                        <form onSubmit={handleSubmitCasual}>
                                            <button
                                                className="button w-100 btn btn-lg btn-outline-danger"
                                                id="checkout-and-portal-button"
                                                type="submit"
                                            >
                                                Let's Go
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card mb-4 rounded-3 shadow border-primary">
                                    <div className="card-header py-3 text-white border-primary bg-primary">
                                        <h4 className="my-0 fw-bold text-white">
                                            <i className="bi bi-award"></i>Pro
                                        </h4>
                                    </div>
                                    <div className="card-body">
                                        <h1 className="card-title pricing-card-title">
                                            $4.99<small className="text-muted fw-light">/month</small>
                                        </h1>
                                        <ul className="list-unstyled mt-3 mb-4">
                                            <li>Access to API KEY</li>
                                            <li>5000 API Requests Day</li>
                                            <li>Access to Telegram BOT</li>
                                            <li>Priority Email Support</li>
                                            <li>Exclusive Telegram Support</li>
                                        </ul>
                                        <form onSubmit={handleSubmitPro}>
                                            <button
                                                className="button w-100 btn btn-lg btn-outline-primary"
                                                id="checkout-and-portal-button"
                                                type="submit"
                                            >
                                                Let's Go
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <Footer />
        </>
    );
}

const containerPricing: CSSProperties = {
    marginTop: "50px",
};
