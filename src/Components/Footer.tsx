import { CSSProperties } from "react";

export default function Footer() {
	return (
		<div className="container col-lg-7" style={containerFooter}>
			<div className="row">
				<footer className="container col-lg-7 w-100 py-4 flex-shrink-0">
					<div className="container py-4">
						<div className="row gy-4 gx-5">
							<div className="col-lg-3"></div>
							<div className="col-lg-6 col-md-6">
								<p className="small text-muted">Receive new updates with our monthly newsletter!</p>
								<form action="#">
									<div className="input-group mb-3">
										<input className="form-control" type="text" placeholder="Digit your email" aria-label="Recipient's username" aria-describedby="button-addon2" />
										<button className="btn btn-success fw-bold" id="button-addon2" type="button">Lets Goo!</button>
									</div>
								</form>
							</div>
							<div className="col-lg-3"></div>
							<div className="col-lg-12 text-center text-muted">
								<small>&copy; <a className="text-primary" href="https://galhardo-telecom.up.railway.app/">Galhardo MicroSaaS</a> | CNPJ: 99.999.999/0000-00 | Rua Avenida Paulista, Nº 42, Centro, São Paulo - São Paulo | CEP 88888-888</small>
							</div>

						</div>
					</div>

					{/* <div className="alert text-center" role="alert" id="cookieAlert">
					<b>We use cookies to improve your experience, offers and advertisements on the site. Our <a href="/privacy">Privacy and Terms of Use Policy</a></b>

					<button type="button" className="fw-bold btn btn-success btn-sm" id="acceptCookies">
						I Agree
					</button>
				</div> */}
				</footer>
			</div>
		</div>
	);
}

const containerFooter: CSSProperties = {
	marginTop: '1px'
}
