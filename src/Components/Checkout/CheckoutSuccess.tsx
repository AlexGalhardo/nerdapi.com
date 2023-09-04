import { Navigate, useLocation } from "react-router-dom";
import CheckoutCasualSuccess from "./CheckoutCasualSuccess";
import CheckoutProSuccess from "./CheckoutProSuccess";
import { useGlobalState } from "../../Context/GlobalStateContext";

export default function CheckoutSuccess() {
	const { login } = useGlobalState();

    if (login === false) {
        window.localStorage.setItem("YOU_NEED_TO_LOGIN_FIRST", "true");
        return <Navigate to="/auth" />;
    }

	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const session_id = queryParams.get('session_id');
  	const planName = queryParams.get('plan');

    return (
        <>
			<div className="col-lg-3 mt-5 sm-8 text-center"></div>
            <div className="col-lg-6 mt-5 sm-8 text-center">
				{planName && planName === 'casual' 
					? 
						<CheckoutCasualSuccess sessionId={session_id as string} /> 
					: 
						<CheckoutProSuccess sessionId={session_id as string}/>}
                <br />
            </div>
			<div className="col-lg-3 mt-5 sm-8 text-center"></div>
        </>
    );
}