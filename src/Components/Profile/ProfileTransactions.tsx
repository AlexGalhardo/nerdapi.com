import { Navigate } from "react-router-dom";
import { useGlobalState } from "../../Context/GlobalStateContext";

export default function ProfileTransactions() {
    const { login } = useGlobalState();

    if (login === false) return <Navigate to="/auth" />;

    return (
        <>
            <div className="col-lg-4 mt-5">
                <form action="/profile" method="POST" id="form_update_profile">
                    <small>
                        <span id="alert_name" className="fw-bold text-danger"></span>
                    </small>

                    <div className="form-group mb-3">
                        <label htmlFor="name">Username</label>
                        <input type="text" className="fs-4 form-control" value={""} name="name" id="name" />
                    </div>

                    <small>
                        <span id="alert_email" className="fw-bold text-danger"></span>
                    </small>
                </form>
            </div>
        </>
    );
}
