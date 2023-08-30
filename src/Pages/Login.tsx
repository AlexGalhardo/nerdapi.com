export default function Blog() {
	return (
		<div className="container col-lg-3 mt-5">

			<h2 className="text-center text-muted mb-4">
				<a className="text-decoration-none" href="/">
					<b className="fw-bold text-primary">
						Galhardo MicroSaaS
					</b>
				</a>
			</h2>

			<form action="/login" method="POST">

				<div className="form-floating mb-3">
					<input value="test@gmail.com"
						type="email"
						className="form-control"
						id="email"
						name="email"
						pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
						placeholder="Enter your email"
						autoFocus
						required />
					<label htmlFor="email">Your Email Address</label>
				</div>

				<div className="form-floating mb-3">
					<input type="password" className="mb-3 form-control" id="password" name="password" placeholder="Enter your password" required value="test123" />
					<label htmlFor="password">Your Password</label>
				</div>

				<div className="form-group">
					<button type="submit" className="shadow mb-3 w-100 btn btn-success btn-block login-btn">Login</button>
				</div>



			</form>

			<div className="text-center">
				<p className="text-center mb-3">
					<a href="/forgetPassword" className="text-decoration-none">
						<b>Forget My Password</b>
					</a>
				</p>

				<p><a href="/register" className="text-success text-decoration-none"><b>Register Account</b></a>
				</p>

				<p><a href="/confirmEmail" className="text-info text-decoration-none"><b>Resend Confirm Email Link</b></a></p>
			</div>
		</div>
	);
}
