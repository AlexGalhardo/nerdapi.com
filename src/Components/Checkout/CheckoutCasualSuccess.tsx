export default function CheckoutCasualSuccess({sessionId}: {sessionId: string}) {
    return (
        <div className="card mb-4 rounded-3 shadow-sm border-danger">
			<div className="card-header py-3 text-white border-primary bg-danger">
				<h4 className="my-0 fw-bold text-white">
					<i className="bi bi-award"></i> You Are Casual now!
				</h4>
			</div>
			<div className="card-body">
				<ul className="list-unstyled mt-3 mb-4">
					<li>Access to API Token</li>
					<li>1000 API Requests Day</li>
					<li>Priority Email Support</li>
					<li>Help center access</li>
				</ul>

				<form action="https://microsaas-api.alexgalhardo.com/create-portal-session" method="POST">
					<input type="hidden" id="session-id" name="session_id" value={sessionId} />
					<button className="button w-100 btn btn-lg btn-outline-danger" id="checkout-and-portal-button" type="submit">Manage your billing information</button>
				</form>
			</div>
		</div>
    );
}
