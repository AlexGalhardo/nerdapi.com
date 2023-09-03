export default function BlogHome() {
	return (
		<>
			<div className="container col-md-8">
				<form action="/blog/search" method="GET" className="d-flex mt-5 mb-5">
					<input className="fs-4 w-100 form-control me-2 shadow" type="search" placeholder="Search blog title..." name="blogTitle" value="" required />
					<button className="fs-5 btn btn-outline-dark button fw-bold" type="submit">Search</button>
				</form>

				<a className="text-dark text-decoration-none" href="/blog/primeira-postagem-do-blog">
					<div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow h-md-250 position-relative">
						<div className="col p-4 d-flex flex-column position-static">
							<h3 className="fw-bold text-primary">Primeira Postagem do Blog</h3>
							<div className="mb-1 text-muted"><small>23/09/2023</small></div>
							<br />
							<p className="card-text mb-auto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum molestiae blanditiis sapiente nostrum quisquam modi quod, facere itaque perspiciatis error beatae officiis et eius. Quam amet voluptas optio nobis expedita.</p>
						</div>

					</div>
				</a>

				<a className="text-dark text-decoration-none" href="/blog/segunda-postagem-do-blog">
					<div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow h-md-250 position-relative">
						<div className="col p-4 d-flex flex-column position-static">
							<h3 className="fw-bold text-primary">Segunda Postagem do Blog</h3>
							<div className="mb-1 text-muted"><small>23/09/2023</small></div>
							<br />
							<p className="card-text mb-auto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum molestiae blanditiis sapiente nostrum quisquam modi quod, facere itaque perspiciatis error beatae officiis et eius. Quam amet voluptas optio nobis expedita.</p>
						</div>

					</div>
				</a>

				<a className="text-dark text-decoration-none" href="/blogPost">
					<div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow h-md-250 position-relative">
						<div className="col p-4 d-flex flex-column position-static">
							<h3 className="fw-bold text-primary">Lorem ipsum dolor</h3>
							<div className="mb-1 text-muted"><small>23/09/2023</small></div>
							<br />
							<p className="card-text mb-auto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum molestiae blanditiis sapiente nostrum quisquam modi quod, facere itaque perspiciatis error beatae officiis et eius. Quam amet voluptas optio nobis expedita.</p>
						</div>

					</div>
				</a>

				<a className="text-dark text-decoration-none" href="/blogPost">
					<div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow h-md-250 position-relative">
						<div className="col p-4 d-flex flex-column position-static">
							<h3 className="fw-bold text-primary">Lorem ipsum dolor</h3>
							<div className="mb-1 text-muted"><small>23/09/2023</small></div>
							<br />
							<p className="card-text mb-auto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum molestiae blanditiis sapiente nostrum quisquam modi quod, facere itaque perspiciatis error beatae officiis et eius. Quam amet voluptas optio nobis expedita.</p>
						</div>

					</div>
				</a>

				<a className="text-dark text-decoration-none" href="/blogPost">
					<div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow h-md-250 position-relative">
						<div className="col p-4 d-flex flex-column position-static">
							<h3 className="fw-bold text-primary">Lorem ipsum dolor</h3>
							<div className="mb-1 text-muted"><small>23/09/2023</small></div>
							<br />
							<p className="card-text mb-auto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum molestiae blanditiis sapiente nostrum quisquam modi quod, facere itaque perspiciatis error beatae officiis et eius. Quam amet voluptas optio nobis expedita.</p>
						</div>

					</div>
				</a>
			</div>
		</>
	)
}