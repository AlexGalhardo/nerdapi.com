export default function Navbar() {
	return (
		<div className="fixed-top shadow bg-light mb-5">

			<nav className="container pt-2 pb-2 col-lg-8 navbar navbar-expand-lg fixed navbar-light">

				<div className="container-fluid">

					<a className="navbar-brand appTitle" href="/">
						<span className="fs-4 fw-bold navbarTitle">Galhardo MicroSaaS</span>
					</a>

					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className="collapse navbar-collapse" id="navbarSupportedContent">

						<ul className="navbar-nav me-auto mb-2 mb-lg-0">

							<li className="nav-item">
								<a className="fs-5 nav-link fw-bold" aria-current="page" href="/blog">
									Blog
								</a>
							</li>

							<li className="nav-item">
								<a className="fs-5 nav-link fw-bold" aria-current="page" href="/contact">
									Contact
								</a>
							</li>

							<li className="nav-item">
								<a className="fs-5 nav-link fw-bold" aria-current="page" href="/pricing"> Pricing</a>
							</li>

							<li className="nav-item">
								<a className="fs-5 nav-link fw-bold" aria-current="page" href="https://nerdapi.com" target="_blank"> API</a>
							</li>

						</ul>

						<div className="pull-right">

							<a href="/login" className="button fw-bold fs-5 btn btn-outline-success" type="submit">Login</a>

							<a href="/register" className="button fw-bold fs-5 ms-2 btn btn-outline-primary" type="submit">Sign Up</a>
						</div>

					</div>

				</div >

			</nav >

		</div >
	);
}
