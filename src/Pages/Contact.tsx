import { CSSProperties } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

export default function Contact() {
	return (
		<>
			<Navbar />
			<div className="container col-lg-5 mt-5" style={containerContact}>

				<div className="row mt-5">

					<form action="/contato" method="POST" className="mt-5">

						<div className="form-group mb-3">
							<label htmlFor="name">Your Name</label>
							<input type="text" className="fs-4 mb-3 form-control" id="name" name="name" required autoFocus />
						</div>

						<div className="form-group mb-3">
							<label htmlFor="email">Your Email</label>
							<input type="email" id="email" name="email" className="fs-4 form-control" required />
						</div>

						<select className="fs-4 form-select mb-3" name="subject" required>
							<option value="bug">I want to report a bug</option>
							<option value="feedback">I want to give a feedback</option>
							<option value="supportAPI">I need support with API</option>
							<option value="other">Other</option>
						</select>

						<div className="mb-3">
							<label htmlFor="message" className="form-label">Digit your message</label>
							<small id="count" className="text-muted"></small>
							<textarea id="message" maxLength={1024} className="form-control" name="message" rows={7} required></textarea>
						</div>

						<button type="button" className="button btn-lg btn btn-outline-success">Send Message</button>

					</form>


				</div>

			</div>
			<Footer />
		</>
	);
}

const containerContact: CSSProperties = {
	marginTop: '300px'
}
