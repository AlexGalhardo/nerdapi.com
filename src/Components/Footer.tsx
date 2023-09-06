import { CSSProperties } from "react";
import Newsletter from "./Newsletter";

export default function Footer() {
    return (
        <div className="container" style={containerFooter}>
            <div className="row">
                <div className="col-lg-4"></div>
                <footer className="col-lg-4 text-center text-muted mb-5 mt-5">
                    {!false ? <Newsletter /> : undefined}
                </footer>
                <div className="col-lg-4"></div>
                <div className="col-lg-12 text-center text-muted mb-3 mt-3">
                    <small>&copy; Galhardo MicroSaaS 2023</small>
                </div>
            </div>
        </div>
    );
}

const containerFooter: CSSProperties = {
    marginTop: "1px",
};
