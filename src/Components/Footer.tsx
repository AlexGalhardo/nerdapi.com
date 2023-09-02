import { CSSProperties } from "react";
// import { useUserState } from "../Context/UserStateContext";
import Newsletter from "./Newsletter";
import { useGlobalState } from "../Context/GlobalStateContext";

export default function Footer() {
	const {globalState} = useGlobalState();

	return (
		<div className="container col-lg-7" style={containerFooter}>
			<div className="row">
				<footer className="container col-lg-7 w-100 py-4 flex-shrink-0">
					<div className="container py-4">
						<div className="row gy-4 gx-5">
							{!globalState.ACCEPTED_TO_RECEIVE_NEWSLETTER ?
								<Newsletter />
								: undefined}
							<div className="col-lg-12 text-center text-muted">
								<small>&copy; Galhardo MicroSaaS 2023</small>
							</div>
						</div>
					</div>
				</footer>
			</div>
		</div>
	);
}

const containerFooter: CSSProperties = {
	marginTop: '1px'
}
