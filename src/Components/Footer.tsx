export default function Footer() {
	return (
		<div className="alert text-center" role="alert" id="cookieAlert">
			<b>We use cookies to improve your experience, offers and advertisements on the site. Our <a href="/privacy">Privacy and Terms of Use Policy</a></b>

			<button type="button" className="fw-bold btn btn-success btn-sm" id="acceptCookies">
				I Agree
			</button>
		</div>
	);
}
