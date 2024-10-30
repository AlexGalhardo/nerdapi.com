import { Navigate } from "react-router-dom";
import { useGlobalState } from "../context/global-state.context";
import Button from "../components/button.component";
import ErrorAlertMessage from "../components/error-alert-message.component";
import { API_URL } from "../utils/constants.util";
import { useState } from "react";

export default function LoginPage() {
	const { userLogin, error, loading, login } = useGlobalState();
	const [email, setEmail] = useState<string>();
	const [password, setPassword] = useState<string>();

	if (login === true) {
		return <Navigate to="/profile" />;
	}

	async function handleSubmit(event: any) {
		event.preventDefault();

		if (email && password) {
			userLogin(email, password);
		}
	}

	return (
		<>
			<div className="container col-lg-3 mt-5">
				<h1 className="text-center text-white mb-4">
					<a className="text-decoration-none" href="/">
						<span className="text-warning">Games</span>
					</a>
				</h1>

				<div
					id="g_id_onload"
					data-client_id="858584783921-pka34eamjupkifpuruahhvabt0gcjqvi.apps.googleusercontent.com"
					data-context="signin"
					data-login_uri={`${API_URL}/login/google/callback`}
					data-locale="en"
				></div>

				<a
					href="https://github.com/login/oauth/authorize?client_id=Ov23liae2RdlKLp9DeH3"
					className="fs-5 fw-bold button btn-sm btn btn-secondary w-100 mt-3"
				>
					<i className="bi bi-github me-2"></i>
					Login with GitHub
				</a>

				<hr />

				<form onSubmit={handleSubmit}>
					<div className="form-group mb-4 mt-3">
						<input
							className="fs-5 form-control"
							placeholder="Email"
							minLength={8}
							type="email"
							name="email"
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>

					<div className="form-group mb-4 text-center">
						<input
							className="fs-5 form-control"
							minLength={12}
							placeholder="Password"
							type="password"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
							required
						/>

						<small className="text-center mb-3 mt-5">
							<a href="/forget-password" className="text-decoration-none mt-3">
								<b>Forgot your password?</b>
							</a>
						</small>
					</div>

					{loading ? <Button disabled={true}>Processing...</Button> : <Button>Login</Button>}

					<ErrorAlertMessage message={error && "Email and/or Password Invalid"} />
				</form>

				<div className="text-center mt-5">
					<div className="text-center mt-5">
						<h5>Doesn't have an account?</h5>
						<h5>
							<a href="/signup" className="text-success text-decoration-none fs-3">
								<b>Signup</b>
							</a>
						</h5>
					</div>
				</div>
			</div>
		</>
	);
}
