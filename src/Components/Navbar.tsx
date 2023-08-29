export default function Navbar() {
	return (
		<div className="fixed-top shadow-sm bg-light">

			<nav className="container pt-2 pb-2 col-lg-12 navbar navbar-expand-lg fixed navbar-light">

				<div className="container-fluid">

					<a className="navbar-brand fw-bold" href="/">
						<span className="fs-4 fw-bold">Recomendae</span>
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
								<a className="fs-5 nav-link fw-bold" aria-current="page" href="/plans"> Plans</a>
							</li>

						</ul>

						<div className="pull-right">

							<a href="/login" className="shadow-sm fw-bold fs-5 btn btn-outline-success" type="submit">Login</a>

							<a href="/register" className="shadow-sm fw-bold fs-5 ms-2 btn btn-outline-primary" type="submit">Sign Up</a>
						</div>

					</div>

				</div >

			</nav >

		</div >
	);
}
