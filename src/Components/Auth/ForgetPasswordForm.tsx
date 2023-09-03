import { Navigate } from "react-router-dom";
import { useGlobalState } from "../../Context/GlobalStateContext";
import useForm from "../../Hooks/useForm";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import ErrorAlertMessage from "../Helper/Error";

export default function ForgetPasswordForm() {
	const { userLogin, error, loading, login } = useGlobalState();

    if (login === true) return <Navigate to="/profile" />;

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
			<form onSubmit={handleSubmit}>

				<div className="form-group mb-4 mt-5">
					<Input minLength={12} placeholder="Digit your email" label="Digit your email" type="email" name="email" {...email} />
				</div>

				{loading ? (
					<Button disabled={true}>Processing...</Button>
					) : (
					<Button>Send me a email to recover password</Button>
				)}

				<ErrorAlertMessage error={error && 'Invalid email or/and password'} />
			</form>
        </>
    );
}
