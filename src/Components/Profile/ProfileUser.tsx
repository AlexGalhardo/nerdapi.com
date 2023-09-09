import { Navigate, useLocation } from "react-router-dom";
import { useGlobalState } from "../../Context/GlobalStateContext";
import SuccessAlertMessage from "../Alerts/SuccessAlertMessage";
import ClipboardJS from 'clipboard';
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function ProfileUser() {
    const { user, login } = useGlobalState();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    let registred = null;

    if (!queryParams.get("token") || !queryParams.get("registred")) {
        if (login === false) {
            return <Navigate to="/auth" />;
        }
    }

	const notifyCopiedAPIKEY = () => toast.success("API KEY COPIED!", {
		position: "top-right",
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "dark",
	});

    async function handleSubmit(event: any) {
        event.preventDefault();
    }

	useEffect(() => {
		const clipboard = new ClipboardJS('.BUTTON_COPY_API_KEY');

		return () => {
			clipboard.destroy();
		};
	}, []);

    return (
        <>
            {registred && (
                <SuccessAlertMessage
                    message={
                        registred === "true" &&
                        "Welcome, your password is your email! You can change your password in this page."
                    }
                />
            )}

			<div className="container col-lg-5">
				<div className="form-group mt-5">
					<label htmlFor="stripe_card_last_4_digits">API KEY</label>
					<input
						id="apiToken"
						name="apiToken"
						className="fs-4 mb-2 form-control"
						type="text"
						defaultValue={user.api_token ?? undefined}
						readOnly
						disabled
					/>
					{!user.api_token && (
						<small><a href="/pricing">You need to have a subscription active to have access to a API KEY.</a></small>
					)}
				</div>

				{user.api_token && (
					<>
						<button onClick={notifyCopiedAPIKEY} className="fw-bold btn btn-outline-success button BUTTON_COPY_API_KEY" data-clipboard-text={user.api_token}>
							COPY API KEY
						</button>
						<ToastContainer />
					</>
				)}

				<div className="mt-5">
					<div className="form-group mb-3">
						<label htmlFor="name">Currently Plan</label>
						<input
							className="fs-4 mb-2 form-control"
							type="text"
							defaultValue={user.stripe.subscription.name}
							readOnly
							disabled
						/>
					</div>

					{user.stripe.subscription.hosted_invoice_url && (
						<a
							className="button fs-4 mt-3 mb-3 w-25 btn btn btn-outline-primary"
							href={user.stripe.subscription.hosted_invoice_url}
							target="_blank"
						>
							Invoice
						</a>
					)}


					<hr></hr>

					<div className="form-group mb-3">
						<label htmlFor="name">Subscription started at</label>
						<input
							className="fs-4 mb-2 form-control"
							name="SUBSCRIPTION_START_DATE_TIME"
							type="text"
							defaultValue={user.stripe.subscription.starts_at ?? undefined}
							readOnly
							disabled
						/>
					</div>

					<div className="form-group mb-3">
						<label htmlFor="name">Subscription ends at</label>
						<input
							className="fs-4 mb-2 form-control"
							name="SUBSCRIPTION_END_DATE_TIME"
							type="text"
							defaultValue={user.stripe.subscription.ends_at ?? undefined}
							readOnly
							disabled
						/>
					</div>

					{user.stripe.subscription.receipt_url && (
						<a
							className="button fs-4 mt-3 mb-3 w-50 btn btn btn-outline-danger"
							href={user.stripe.subscription.receipt_url}
							target="_blank"
						>
							Manage Subscription
						</a>
					)}

				</div>
			</div>

            <div className="col-lg-5 mt-5">
                <form onSubmit={handleSubmit}>
                    <small>
                        <span id="alert_name" className="fw-bold text-danger"></span>
                    </small>

                    <div className="form-group mb-3">
                        <label htmlFor="name">Username</label>
                        <input
                            type="text"
                            className="fs-4 form-control"
                            defaultValue={user.username}
                            name="name"
                            id="name"
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="fs-4 form-control"
                            name="email"
                            id="email"
                            defaultValue={user.email}
                            readOnly
							disabled
                        />
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
                            defaultValue={user.telegram_number}
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
                        <input type="password" className="fs-4 form-control" id="new_password" name="new_password" />
                    </div>

                    <input
                        type="submit"
                        id="button_update_profile"
                        className="button fs-4 mt-3 mb-3 w-50 btn btn btn-outline-success"
                        value="Update Profile"
                    />
                </form>
            </div>
        </>
    );
}
