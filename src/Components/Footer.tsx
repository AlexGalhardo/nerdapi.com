import { CSSProperties } from "react";
import Newsletter from "./Newsletter";

export default function Footer() {
    return (
        <div className="container" style={containerFooter}>
            <div className="row">
                <div className="col-lg-12 text-center text-muted mb-3 mt-5">
                    <small>&copy; NerdAPI.com 2023</small><br/>
                </div>
            </div>
        </div>
    );
}

const containerFooter: CSSProperties = {
    marginTop: "1px",
};
