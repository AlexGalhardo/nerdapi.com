import { CSSProperties } from "react";

export default function Contact() {
	return (
		<div className="container col-lg-10 mt-3" style={containerContact}>

			<div className="row mt-5">

				<div className="col-lg-6 mt-5">

					<form action="/contato" method="POST" className="mt-1">

						<div className="form-floating mb-3">
							<input type="txt" className="mb-3 form-control" id="name" name="name" required autoFocus />
							<label htmlFor="name">Your Name (obrigatório)</label>
						</div>

						<div className="form-floating mb-3">
							<input type="email" id="email" name="email" className="form-control" />
							<label htmlFor="email">Your Email (Opcional)</label>
						</div>

						<select className="form-select mb-3" name="subject" required>
							<option value="Problema Técnico Na Instalação">I want to report a bug</option>
							<option value="Internet Lenta">I want to give a feedback</option>
							<option value="Outro Assunto">I need support with API</option>
							<option value="Outro Assunto">Other</option>
						</select>

						<div className="mb-3">
							<label htmlFor="message" className="form-label">Digite sua mensagem</label>
							<small id="count" className="text-muted"></small>
							<textarea id="message" maxLength={1024} className="form-control" name="message" rows={7} required></textarea>
						</div>

						<button type="button" className="btn btn-outline-success shadow disabled">Send Message</button>

					</form>

				</div>

				<div className="col-lg-6">

					<div className="mt-5">
						<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0754269090894!2d-46.6538128237952!3d-23.565734361754636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1sen!2sbr!4v1673034151128!5m2!1sen!2sbr" width="600" height="400" allowFullScreen={true} loading="lazy"></iframe>
					</div>

					<br />

					<p><b><i className="bi bi-whatsapp"></i> WhatsApp:</b> <a target="_blank" href="https://api.whatsapp.com/send?phone=551838710606"> +55 (18) 3871-0606</a></p>

					{/* <p><b><i className="bi bi-envelope"></i> Email:</b> <a href="mailto:contact@nerdapi.com"> </b> contact@nerdapi.com</a></p> */}

					<p><b><i className="bi bi-phone"></i> Atendimento:</b> De Segunda a Sexta: das 9h as 18h | Sábado: das 9h as 13h</p>

					<p><b><i className="bi bi-pin-map"></i> Endereço:</b> Rua Av Paulista, Nº 42, Centro, São Paulo</p>

					<p><b><i className="bi bi-map"></i> CEP:</b> 17980-000</p>

					<p><b><i className="bi bi-receipt"></i> CNPJ:</b> 999.999.999</p>

				</div>

			</div>

		</div>
	);
}

const containerContact: CSSProperties = {
	marginTop: '300px'
}
