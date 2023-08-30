export default function Register() {
	return (
		<>
			<div className="container col-lg-3 mt-5">

				<h2 className="text-center text-muted mb-4">
					<a className="text-decoration-none" href="/">
						<b className="fw-bold text-primary">
							Galhardo MicroSaaS
						</b>
					</a>
				</h2>

				<form action="/register" method="POST" id="form_register">

					<small><span id="alert_name" className="fw-bold text-danger"></span></small>

					<div className="form-floating mb-3">
						<input type="text" className="form-control mb-3" id="username" name="username" placeholder="Enter your username" required autoFocus value="" minLength={4} maxLength={32} />
						<label htmlFor="username">Username</label>
					</div>

					<small><span id="alert_email" className="fw-bold text-danger"></span></small>

					<div className="form-floating mb-3">
						<input type="email" className="form-control mb-3" name="email" id="email" required value="" title="You can't delete email if sign up with social login" />
						<label htmlFor="email">Email</label>
					</div>

					<small><span id="alert_password" className="fw-bold text-danger"></span></small>

					<div className="form-floating mb-3">
						<input type="password" className="mb-3 form-control" id="password" name="password" placeholder="Enter your password" minLength={6} required />
						<label htmlFor="password">Password</label>
					</div>

					<div className="form-floating mb-3">
						<input type="password" className="mb-3 form-control" id="confirm_password" name="confirm_password" placeholder="Confirm your password" minLength={6} required />
						<label htmlFor="confirm_password">Confirm Password</label>
					</div>

					<div className="mb-3 form-check">
						<small><span id="alert_checkbox" className="fw-bold text-danger"></span></small>
						<input type="checkbox" className="form-check-input" id="checkbox_policy" />
						<label className="form-check-label" htmlFor="checkbox_policy">
							<small>
								By registering your account, you agree with our
								<a target="_blank" href="/privacy">Privacy and Terms of Use Policy</a> and accept to receive newsletter offers and advertisements.
							</small>
						</label>
					</div>

					<div className="form-group">
						<button type="submit" className="shadow mb-3 w-100 btn btn-primary btn-block login-btn" id="button_register">Register Account</button>
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
