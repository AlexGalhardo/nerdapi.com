import { Navigate } from "react-router-dom";
import { useGlobalState } from "../../Context/GlobalStateContext";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { USER_REGISTER } from "../../Api";

export default function RegisterForm() {
	const { login, userLogin } = useGlobalState();

    if (login === true) return <Navigate to="/profile" />;

	const username = useForm('username');
	const email = useForm('email');
	const password = useForm('password');

	const { loading, error, request } = useFetch();

	async function handleSubmit(event: any) {
		event.preventDefault();
		const { url, options } = USER_REGISTER({
			username: username.value,
			email: email.value,
			password: password.value,
		});
		const { response } = await request(url, options);
		if (response?.ok) userLogin(username.value, password.value);
	}

	return (
		<>
			<form onSubmit={handleSubmit}>

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
				<h4><a href="/auth" className="text-success text-decoration-none"><b>Login</b></a>
				</h4>
			</div>
		</>
	);
}
