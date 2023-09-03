import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        if (window.localStorage.getItem("token")) {
            window.localStorage.removeItem("token");
        }

        navigate("/login");
    }, []);

    return (
        <>
            <p>alguma coisa</p>
        </>
    );
}
