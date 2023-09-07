import { API_URL } from "../../Api";

export default function CheckoutCasualSuccess({ sessionId }: { sessionId: string }) {
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/create-portal-session`, {
                method: "POST",
                body: JSON.stringify({
                    session_id: sessionId,
                }),
                headers: {
                    "Content-Type": "application/json",
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
        <div className="card mb-4 rounded-3 shadow-sm border-danger">
            <div className="card-header py-3 text-white border-primary bg-danger">
                <h4 className="my-0 fw-bold text-white">
                    <i className="bi bi-award"></i> You Are Casual now!
                </h4>
            </div>
            <div className="card-body">
                <ul className="list-unstyled mt-3 mb-4">
                    <li>Access to API KEY</li>
                    <li>1000 API Requests Day</li>
                    <li>Priority Email Support</li>
                    <li>Help center access</li>
                </ul>

                <form onSubmit={handleSubmit}>
                    <button
                        className="fs-4 fw-bold button w-100 btn btn-lg btn-outline-danger"
                        id="checkout-and-portal-button"
                        type="submit"
                    >
                        Manage your billing information
                    </button>
                </form>
            </div>
        </div>
    );
}
