import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../Context/GlobalStateContext";
import { useEffect } from "react";

export default function Register() {
	const {globalState} = useGlobalState()
	const navigate = useNavigate();

	if(globalState.USER.LOGGED_IN) navigate("/profile");

	// useEffect(() => {
	// 	if(globalState.USER.LOGGED_IN) navigate("/profile");
	// }, [globalState.USER.LOGGED_IN])

	return (
		<>
			<div className="container col-lg-3 mt-5">

				<h1 className="text-center text-muted mb-4">
					<a className="text-decoration-none" href="/">
						<b className="fw-bold text-primary">
							Galhardo MicroSaaS
						</b>
					</a>
				</h1>

				<form action="/register" method="POST" id="form_register">

					<small><span id="alert_name" className="fw-bold text-danger"></span></small>

					<div className="form-group mb-3">
						<label htmlFor="username">Username</label>
						<input type="text" className="fs-4 form-control mb-3" id="username" name="username" placeholder="Digit your username" required autoFocus minLength={4} maxLength={32} />
					</div>

					<small><span id="alert_email" className="fw-bold text-danger"></span></small>

					<div className="form-group mb-3">
						<label htmlFor="email">Email</label>
						<input type="email" className="fs-4 form-control mb-3" name="email" id="email" required placeholder="Digit your email" />
					</div>

					<small><span id="alert_password" className="fw-bold text-danger"></span></small>

					<div className="form-group mb-3">
						<label htmlFor="password">Password</label>
						<input type="password" className="fs-4 mb-3 form-control" id="password" name="password" placeholder="Digit your password" minLength={6} required />
					</div>

					<div className="form-group mb-3">
						<label htmlFor="confirm_password">Confirm Password</label>
						<input type="password" className="mb-3 form-control fs-4" id="confirm_password" name="confirm_password" placeholder="Confirm your password" minLength={6} required />
					</div>

					<div className="mb-3 mt-4 form-check">
						<small><span id="alert_checkbox" className="fw-bold text-danger"></span></small>
						<input type="checkbox" className="form-check-input" id="checkbox_policy" />
						<label className="form-check-label" htmlFor="checkbox_policy">
							<small>
								By registering your account, you agree with our
								<a target="_blank" href="/privacy"> Privacy and Terms of Use Policy</a> and accept to receive newsletter offers and advertisements.
							</small>
						</label>
					</div>

					<div className="form-group">
						<button type="submit" className="fs-4 fw-bold button btn-lg mb-3 w-100 btn btn-outline-primary btn-block login-btn" id="button_register">Register Account</button>
					</div>

				</form>

				<div className="text-center mt-5">
					<h4>Already have a account?</h4>
					<h4><a href="/login" className="text-success text-decoration-none"><b>Login</b></a>
					</h4>
				</div>

			</div>
		</>
	);
}
