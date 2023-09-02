import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../Context/GlobalStateContext";
import { useEffect } from "react";

export default function Login() {
	const { globalState, userLogin } = useGlobalState();
	const navigate = useNavigate();

	if(globalState.LOGGED_IN) navigate("/profile");

	// useEffect(() => {

	// }, [globalState.LOGGED_IN])

	async function handleSubmit(event: any) {
		event.preventDefault();
		console.log('entrou dentro do handleSubmit...')
		// const { url, options } = USER_POST({
		// username: username.value,
		// email: email.value,
		// password: password.value,
		// });
		// const { response } = await request(url, options);
		// if (response.ok) userLogin(username.value, password.value);
		return await userLogin()
	}

    return (
        <div className="container col-lg-3 mt-5">
            <h1 className="text-center mb-4">
                <a className="text-decoration-none" href="/">
                    <b className="fw-bold text-primary">Galhardo MicroSaaS</b>
                </a>
            </h1>

			{globalState.FLASH_MESSAGES.YOU_NEED_TO_LOGIN_FIRST ?
			<p className="alert alert-danger text-center fw-bold fs-4">
				{globalState.FLASH_MESSAGES.YOU_NEED_TO_LOGIN_FIRST}
			</p>
			: undefined}

            <div className="form-group mb-2">
                <button
					disabled
                    type="submit"
                    className="fs-4 button w-100 btn btn-outline-dark btn-lg btn-block login-btn fw-bold"
                >
                    <i className="bi bi-github" /> Login with Github
                </button>
            </div>

            <div className="form-group mb-2">
                <button
					disabled
                    type="submit"
                    className="fs-4 button w-100 btn btn-outline-danger btn-lg btn-block login-btn fw-bold"
                >
                    <i className="bi bi-google" /> Login with Google
                </button>
            </div>

            <div className="form-group mb-3">
                <button
					disabled
                    type="submit"
                    className="fs-4 button w-100 btn btn-outline-primary btn-lg btn-block login-btn fw-bold"
                >
                    <i className="bi bi-facebook" /> Login with Facebook
                </button>
            </div>

			<form onSubmit={handleSubmit}>

				<div className="form-group mb-4 mt-5">
					<label htmlFor="email" className="text-muted">
						Your Email Address
					</label>
					<input
						type="email"
						className="fs-4 form-control"
						id="email"
						name="email"
						placeholder="Digit your email"
						// value="test@gmail.com"
						autoFocus
						required
					/>
				</div>

				<div className="form-group mb-4">
					<label htmlFor="password" className="text-muted">
						Your Password
					</label>
					<input
						type="password"
						className="fs-4 mb-3 form-control"
						id="password"
						name="password"
						// value="testBR@123"
						placeholder="Digit your password"
						required
					/>
				</div>

				<div className="form-group mb-3">
					<button
						type="submit"
						className="fs-4 button mb-3 w-100 btn btn-outline-success btn-lg btn-block login-btn fw-bold"
					>
						Login
					</button>
				</div>
			</form>

            <div className="text-center mt-5">
                <p className="text-center mb-3 mt-3">
                    <a href="/forgetPassword" className="text-decoration-none">
                        <b>Forget My Password</b>
                    </a>
                </p>

                <p>
                    <a href="/register" className="text-success text-decoration-none">
                        <b>Register Account</b>
                    </a>
                </p>

                <p>
                    <a href="/confirmEmail" className="text-info text-decoration-none">
                        <b>Resend Confirm Email Link</b>
                    </a>
                </p>
            </div>
        </div>
    );
}
