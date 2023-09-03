import { Navigate } from "react-router-dom";
import { useGlobalState } from "../../Context/GlobalStateContext";
import useForm from "../../Hooks/useForm";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import ErrorAlertMessage from "../Alerts/ErrorAlertMessage";

export default function LoginForm() {
	const { globalState, userLogin, error, loading, login } = useGlobalState();

    if (login === true) {
		return <Navigate to="/profile" />;
	}

	const email = useForm('email');
  	const password = useForm('password');

	async function handleSubmit(event: any) {
		event.preventDefault();

		if (email.validate() && password.validate()) {
			userLogin(email.value, password.value);
		}
	}

    return (
        <>
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
					<Input minLength={12} placeholder="Digit your email" label="Digit your email" type="email" name="email" {...email} />
				</div>

				<div className="form-group mb-4">
					<Input minLength={8} placeholder="Digit your password" label="Digit your password" type="password" name="password" {...password} />
				</div>

				{loading ? (
					<Button disabled={true}>Processing...</Button>
					) : (
					<Button>Login</Button>
				)}

				<ErrorAlertMessage error={error && 'Invalid email or/and password'} />
			</form>

            <div className="text-center mt-5">
                <p className="text-center mb-3 mt-3">
                    <a href="/auth/forgetPassword" className="text-decoration-none">
                        <b>Forget My Password</b>
                    </a>
                </p>

                <p>
                    <a href="/auth/register" className="text-success text-decoration-none">
                        <b>Register Account</b>
                    </a>
                </p>

                {/* <p>
                    <a href="/confirmEmail" className="text-info text-decoration-none">
                        <b>Resend Confirm Email Link</b>
                    </a>
                </p> */}
            </div>
        </>
    );
}
