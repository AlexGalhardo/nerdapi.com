import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { useUserState } from "../Context/UserStateContext";
import { Navigate } from "react-router-dom";
import { useGlobalState, DispatchActionType } from "../Context/GlobalStateContext";

export default function Profile() {
	const { userState } = useUserState();
	const { globalState, globalDispatch } = useGlobalState();

	if (!userState.LOGGED_IN) {
		globalDispatch({
            type: DispatchActionType.YOU_NEED_TO_LOGIN_FIRST
        });

		return <Navigate to="/login" />;
	}

    return (
        <>
            <Navbar />

            <main className="container col-lg-12 mt-5 mb-5">

                <div className="row">

					{globalState.FLASH_MESSAGES.YOU_ARE_ALREADY_LOGGED_IN ?
					<p className="mt-5 alert alert-danger text-center fw-bold fs-4">
						{globalState.FLASH_MESSAGES.YOU_ARE_ALREADY_LOGGED_IN}
					</p>
					: undefined}

                    <div className="col-lg-4 mt-5">
                        <form action="/profile" method="POST" id="form_update_profile">

                            <small>
                                <span id="alert_name" className="fw-bold text-danger"></span>
                            </small>

                            <div className="form-group mb-3">
                                <label htmlFor="name">Username</label>
                                <input
                                    type="text"
                                    className="fs-4 form-control"
                                    value={userState.NAME}
                                    name="name"
                                    id="name"
                                />
                            </div>

                            <small>
                                <span id="alert_email" className="fw-bold text-danger"></span>
                            </small>

                            <div className="form-group mb-3">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="fs-4 form-control" name="email" id="email" value={userState.EMAIL} readOnly />
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
									value={userState.TELEGRAM_NUMBER}
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
								value={userState.STRIPE.CUSTOMER_ID}
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
								value={userState.STRIPE.CARD_ID}
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
								value={userState.STRIPE.CARD_LAST_4_DIGITS}
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
										value={userState.STRIPE.CARD_EXP_MONTH}
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
										value={userState.STRIPE.CARD_EXP_YEAR}
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
								value={userState.API_TOKEN}
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
								value={userState.SUBSCRIPTION.CURRENTLY_PLAN}
								readOnly
							/>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="name">Currently Subscription ID</label>
                            <input
								className="fs-4 mb-2 form-control"
								type="text"
								value={userState.SUBSCRIPTION.ID}
								readOnly
							/>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="name">Subscription started at</label>
                            <input
                                className="fs-4 mb-2 form-control"
                                name="SUBSCRIPTION_START_DATE_TIME"
                                type="text"
								value={userState.SUBSCRIPTION.STARTED_AT}
                                readOnly
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="name">Subscription ends at</label>
                            <input
                                className="fs-4 mb-2 form-control"
                                name="SUBSCRIPTION_END_DATE_TIME"
                                type="text"
								value={userState.SUBSCRIPTION.ENDS_AT}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
