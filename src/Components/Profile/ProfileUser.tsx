import { Navigate } from "react-router-dom";
import { useGlobalState } from "../../Context/GlobalStateContext";

export default function ProfileUser() {
	const { globalState, login } = useGlobalState();

    if (login === false) {
		return <Navigate to="/auth" />;
	}

	async function handleSubmit(event: any) {
		event.preventDefault();
	}

    return (
        <>
			{globalState.FLASH_MESSAGES.USER_ARE_ALREADY_LOGGED_IN ?
				<p className="alert alert-danger text-center fw-bold fs-4">
					{globalState.FLASH_MESSAGES.USER_ARE_ALREADY_LOGGED_IN}
				</p>
			: undefined}

			<div className="col-lg-4 mt-5">
				<form onSubmit={handleSubmit}>

					<small>
						<span id="alert_name" className="fw-bold text-danger"></span>
					</small>

					<div className="form-group mb-3">
						<label htmlFor="name">Username</label>
						<input
							type="text"
							className="fs-4 form-control"
							defaultValue={globalState.USER.NAME}
							name="name"
							id="name"
						/>
					</div>

					<small>
						<span id="alert_email" className="fw-bold text-danger"></span>
					</small>

					<div className="form-group mb-3">
						<label htmlFor="email">Email</label>
						<input type="email" className="fs-4 form-control" name="email" id="email" defaultValue={globalState.USER.EMAIL} readOnly />
					</div>

					<div className="form-group mb-3">
						<label htmlFor="phone">Telegram Number</label>
						<input
							className="fs-4 mb-2 form-control"
							id="phone"
							type="text"
							name="phone"
							pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}"
							minLength={11}
							maxLength={11}
							defaultValue={globalState.USER.TELEGRAM_NUMBER}
							required
						/>
					</div>

					<div className="form-group mb-3">
						<label htmlFor="older_password">Older Password</label>
						<input
							type="password"
							className="fs-4 form-control"
							id="older_password"
							name="older_password"
							required
						/>
					</div>

					<small>
						<span id="alert_password" className="fw-bold text-danger"></span>
					</small>

					<div className="form-group mb-3">
						<label htmlFor="new_password">New Password</label>
						<input
							type="password"
							className="fs-4 form-control"
							id="new_password"
							name="new_password"
						/>
					</div>

					<input
						type="submit"
						id="button_update_profile"
						className="button fs-4 mt-3 mb-3 w-100 btn btn btn-outline-success"
						value="Update Profile"
					/>
				</form>
			</div>

			<div className="col-lg-4 mt-5">
				<div className="form-group mb-3">
					<label htmlFor="name">Stripe Customer ID</label>
					<input
						className="fs-4 mb-2 form-control"
						name="stripe_customer_id"
						type="text"
						value={globalState.USER.STRIPE.CUSTOMER_ID}
						readOnly
					/>
				</div>

				<div className="form-group mb-3">
					<label htmlFor="stripe_card_id">Stripe Card ID</label>
					<input
						id="stripe_card_id"
						name="stripe_card_id"
						className="fs-4 mb-2 form-control"
						type="text"
						value={globalState.USER.STRIPE.CARD_ID}
						readOnly
					/>
				</div>

				<div className="form-group mb-3">
					<label htmlFor="stripe_card_last_4_digits">Stripe Card Last 4 Digits</label>
					<input
						id="stripe_card_last_4_digits"
						name="stripe_card_last_4_digits"
						className="fs-4 mb-2 form-control"
						type="text"
						value={globalState.USER.STRIPE.CARD_LAST_4_DIGITS}
						readOnly
					/>
				</div>

				<div className="row g-2 mb-3">
					<div className="col-md">
						<div className="form-group">
							<label htmlFor="card_exp_month">Card Exp Month</label>
							<input
								type="text"
								className="fs-4 form-control"
								name="card_exp_year"
								id="card_exp_month"
								value={globalState.USER.STRIPE.CARD_EXP_MONTH}
								readOnly
							/>
						</div>
					</div>
					<div className="col-md">
						<div className="form-group">
							<label htmlFor="card_exp_year">Card Exp Year</label>
							<input
								type="text"
								className="fs-4 form-control"
								name="card_exp_year"
								id="card_exp_year"
								value={globalState.USER.STRIPE.CARD_EXP_YEAR}
								readOnly
							/>
						</div>
					</div>
				</div>

				<div className="form-group mb-3">
					<label htmlFor="stripe_card_last_4_digits">API Token</label>
					<input
						id="apiToken"
						name="apiToken"
						className="fs-4 mb-2 form-control"
						type="text"
						value={globalState.USER.API_TOKEN}
						readOnly
					/>
				</div>
			</div>

			<div className="col-lg-4 mt-5">
				<div className="form-group mb-3">
					<label htmlFor="name">Currently Plan</label>
					<input
						className="fs-4 mb-2 form-control"
						type="text"
						value={globalState.USER.SUBSCRIPTION.CURRENTLY_PLAN}
						readOnly
					/>
				</div>

				<div className="form-group mb-3">
					<label htmlFor="name">Currently Subscription ID</label>
					<input
						className="fs-4 mb-2 form-control"
						type="text"
						value={globalState.USER.SUBSCRIPTION.ID}
						readOnly
					/>
				</div>

				<div className="form-group mb-3">
					<label htmlFor="name">Subscription started at</label>
					<input
						className="fs-4 mb-2 form-control"
						name="SUBSCRIPTION_START_DATE_TIME"
						type="text"
						value={globalState.USER.SUBSCRIPTION.STARTED_AT}
						readOnly
					/>
				</div>

				<div className="form-group mb-3">
					<label htmlFor="name">Subscription ends at</label>
					<input
						className="fs-4 mb-2 form-control"
						name="SUBSCRIPTION_END_DATE_TIME"
						type="text"
						value={globalState.USER.SUBSCRIPTION.ENDS_AT}
						readOnly
					/>
				</div>
			</div>
        </>
    );
}
