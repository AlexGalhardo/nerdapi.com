import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

export default function BlogPost() {
	return (
		<>
			<Navbar />
			<main className="container col-lg-8 mt-5">

				<div className="row">

					<div className="container col-md-8 mt-5">
						<div className="col p-4 d-flex flex-column position-static">
							<h1 className="fw-bold text-primary text-center">Lorem ipsum dolor</h1>
							<div className="text-center mb-1 text-muted"><small>23/09/2023</small></div>
							<br />
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum molestiae blanditiis sapiente nostrum quisquam modi quod, facere itaque perspiciatis error beatae officiis et eius. Quam amet voluptas optio nobis expedita.</p>
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum molestiae blanditiis sapiente nostrum quisquam modi quod, facere itaque perspiciatis error beatae officiis et eius. Quam amet voluptas optio nobis expedita.</p>
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum molestiae blanditiis sapiente nostrum quisquam modi quod, facere itaque perspiciatis error beatae officiis et eius. Quam amet voluptas optio nobis expedita.</p>
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum molestiae blanditiis sapiente nostrum quisquam modi quod, facere itaque perspiciatis error beatae officiis et eius. Quam amet voluptas optio nobis expedita.</p>
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum molestiae blanditiis sapiente nostrum quisquam modi quod, facere itaque perspiciatis error beatae officiis et eius. Quam amet voluptas optio nobis expedita.</p>
						</div>
					</div>

				</div>

			</main>
			<Footer />
		</>
	);
}
