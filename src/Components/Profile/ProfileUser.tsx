import { Navigate, useLocation } from "react-router-dom";
import { useGlobalState } from "../../Context/GlobalStateContext";
import SuccessAlertMessage from "../Alerts/SuccessAlertMessage";
import ClipboardJS from 'clipboard';
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function ProfileUser() {
	const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
	const { user, login, updateProfile } = useGlobalState();
    let registred = null;

    if (!queryParams.get("token") || !queryParams.get("registred")) {
        if (!login) {
            return <Navigate to="/auth" />;
        }
    }

	const [username, setUsername] = useState<string>(user?.username as string)
	let [telegramNumber, setTelegramNumber] = useState<string>(user?.telegram_number as string)
	const [olderPassword, setOlderPassword] = useState<string>()
	const [newPassword, setNewPassword] = useState<string>()

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

	const BRAZIL_VALID_PHONE_DDD = [
		11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48,
		49, 51, 53, 54, 55, 61, 62, 64, 63, 65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89,
		91, 92, 93, 94, 95, 96, 97, 98, 99,
	];

    async function handleSubmit(event: any) {
        event.preventDefault();

		function isValidTelegramNumber(): boolean {
			telegramNumber = telegramNumber?.replace(/\D/g, "");

			function invalidTelegramNumber(){
				toast.error("Invalid Telegram Number", {
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "dark",
				});
			}

			if (telegramNumber?.length !== 13) { invalidTelegramNumber(); return false; }

			if (parseInt(telegramNumber.substring(4, 5)) !== 9) { invalidTelegramNumber(); return false; }

			if (new Set(telegramNumber).size === 1) { invalidTelegramNumber(); return false; }

			if (BRAZIL_VALID_PHONE_DDD.indexOf(parseInt(telegramNumber.substring(2, 4))) == -1) { invalidTelegramNumber(); return false; }

			return true;
		}

		function isValidUsername(): boolean {
			if (!username || username.length <= 3) {
				toast.error("Invalid Username", {
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "dark",
				});
				return false;
			}
			const regexOfValidNamesWithAcents = /^[a-zA-ZÀ-ú]+$/g;
			return regexOfValidNamesWithAcents.test(username);
		}

		function isNewPasswordSecure(newPassword: string): boolean {
			if (newPassword.length < 12) {
				toast.error("Password must has at least 12 caracters", {
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "dark",
				});
				return false;
			}

			const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
			const uppercaseRegex = /[A-Z]/;
			const numberRegex = /[0-9]/;

			return (
				specialCharRegex.test(newPassword) &&
				uppercaseRegex.test(newPassword) &&
				numberRegex.test(newPassword)
			);
		}

		async function isNewPasswordValid(): Promise<boolean> {
			if (!isNewPasswordSecure(newPassword as string)) {
				toast.error("Password must has at least 1 upperCase, 1 letter and 1 special character", {
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "dark",
				});
				return false
			}
			return true;
		}

		updateProfile({
			username: isValidUsername() ? username : undefined,
			telegramNumber: isValidTelegramNumber() ? telegramNumber : undefined,
			olderPassword: await isNewPasswordValid() ? olderPassword : undefined,
			newPassword: await isNewPasswordValid() ? newPassword : undefined,
		})
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
						defaultValue={user?.api_token ?? undefined}
						readOnly
						disabled
					/>
					{!user?.api_token && (
						<small><a href="/pricing">You need to have a subscription active to have access to a API KEY.</a></small>
					)}
				</div>

				{user?.api_token && (
					<>
						<button onClick={notifyCopiedAPIKEY} className="fw-bold btn btn-outline-success button BUTTON_COPY_API_KEY" data-clipboard-text={user?.api_token}>
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
							defaultValue={user?.stripe.subscription.name as string}
							readOnly
							disabled
						/>
					</div>

					{user?.stripe.subscription.hosted_invoice_url && (
						<a
							className="button fs-4 mt-3 mb-3 w-25 btn btn btn-outline-primary"
							href={user?.stripe.subscription.hosted_invoice_url}
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
							defaultValue={user?.stripe.subscription.starts_at ?? undefined}
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
							defaultValue={user?.stripe.subscription.ends_at ?? undefined}
							readOnly
							disabled
						/>
					</div>

					{user?.stripe.subscription.receipt_url && (
						<a
							className="button fs-4 mt-3 mb-3 w-50 btn btn btn-outline-danger"
							href={user?.stripe.subscription.receipt_url}
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
                            defaultValue={username}
                            name="name"
							onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="fs-4 form-control"
                            name="email"
                            defaultValue={user?.email as string}
                            readOnly
							disabled
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="telegram_number">Telegram Number</label>
                        <input
                            className="fs-4 mb-2 form-control"
                            type="text"
                            name="telegram_number"
                            minLength={11}
                            maxLength={11}
                            defaultValue={user?.telegram_number as string}
							onChange={(e) => setTelegramNumber(e.target.value)}
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="older_password">Older Password</label>
                        <input
                            type="password"
                            className="fs-4 form-control"
                            name="older_password"
							onChange={(e) => setOlderPassword(e.target.value)}
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
							name="new_password"
							onChange={(e) => setNewPassword(e.target.value)}
						/>
                    </div>

                    <input
                        type="submit"
                        className="button fs-4 mt-3 mb-3 w-50 btn btn btn-outline-success"
                        value="Update Profile"
                    />
                </form>
            </div>
        </>
    );
}
