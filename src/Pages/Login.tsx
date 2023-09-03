import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../Context/GlobalStateContext";
import useForm from "../Hooks/useForm";
import Input from "../Components/Forms/Input";
import Error from '../Components/Helper/Error';
import Button from "../Components/Forms/Button";
import { useEffect } from "react";
import { VALIDATE_TOKEN } from "../Api";

export default function Login() {
	const navigate = useNavigate();
	const { globalState, userLogin, error, loading } = useGlobalState();

	if(globalState.USER.LOGGED_IN) navigate("/profile");

	useEffect(() => {
		async function autoLogin() {
			const token = window.localStorage.getItem('token');
			if (token) {
				const { url, options } = VALIDATE_TOKEN(token);
				const response = await fetch(url, options);
				if(response.status === 200) navigate('/profile')
			}
		}
		autoLogin();
	}, [window.localStorage.getItem('token')])

	const email = useForm('email');
  	const password = useForm('password');

	async function handleSubmit(event: any) {
		event.preventDefault();

		if (email.validate() && password.validate()) {
			userLogin(email.value, password.value);
		}
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
					<Input placeholder="Digit your email" label="Digit your email" type="email" name="email" {...email} />
				</div>

				<div className="form-group mb-4">
					<Input placeholder="Digit your password" label="Digit your password" type="password" name="password" {...password} />
				</div>

				{loading ? (
					<Button disabled>Processing...</Button>
					) : (
					<Button>Login</Button>
				)}

				<Error error={error && 'Invalid email or/and password'} />
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
