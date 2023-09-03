import { CSSProperties } from "react";
import Navbar from "../Components/Navbar";

export default function Pricing() {
    return (
        <>
            <Navbar />
            <div className="container col-lg-7" style={containerPricing}>
                <div className="row">
                    <div className="pricing-header p-3 pb-md-4 text-center mt-5">
                        <p className="fs-5 text-muted">
                            Elevate your entertainment experience with our subscription plans for access to a vast
                            library of games, books, and movies through our API. Dive into a world of endless
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
                                            <li>No Access API Token</li>
                                            <li>Limited Recomendations</li>
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
                                            <li>Access to API Token</li>
                                            <li>1000 API Requests Day</li>
                                            <li>Priority Email Support</li>
                                            <li>Help center access</li>
                                        </ul>
                                        <a
                                            href="/checkout/casual"
                                            type="button"
                                            className="button w-100 btn btn-lg btn-outline-danger"
                                        >
                                            Let's Go
                                        </a>
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
                                            <li>Access to API Token</li>
                                            <li>5000 API Requests Day</li>
                                            <li>Access to Telegram BOT</li>
                                            <li>Priority Email Support</li>
                                            <li>Priority Telegram Support</li>
                                        </ul>
                                        <a
                                            href="/checkout/pro"
                                            type="button"
                                            className="button w-100 btn btn-lg btn-outline-primary"
                                        >
                                            Let's Go
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <div className="col-lg-12 text-center text-muted mb-3 mt-3">
                <small>&copy; Galhardo MicroSaaS 2023</small>
            </div>
        </>
    );
}

const containerPricing: CSSProperties = {
    marginTop: "50px",
};
