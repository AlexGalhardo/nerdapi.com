import { CSSProperties } from "react";

export default function Pricing({ active }: { active: boolean }) {
	return (
		<div className="container col-lg-7" style={containerPricing}>
			<div className="row">
				<div className="pricing-header p-3 pb-md-4 text-center">
					<h1 className="display-4 fw-normal">Pricing</h1>
					<p className="fs-5 text-muted">Quickly build an effective pricing table for your potential customers with this Bootstrap example. It’s built with default Bootstrap components and utilities with little customization.</p>
				</div>

				<main>
					<div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
						<div className="col">
							<div className="card mb-4 rounded-3 shadow-sm">
								<div className="card-header py-3 bg-success">
									<h4 className="my-0 fw-bold text-white">Noob</h4>
								</div>
								<div className="card-body">
									<h1 className="card-title pricing-card-title">$0<small className="text-muted fw-light">/month</small></h1>
									<ul className="list-unstyled mt-3 mb-4">
										<li>10 users included</li>
										<li>2 GB of storage</li>
										<li>Email support</li>
										<li>Help center access</li>
									</ul>
								</div>
							</div>
						</div>
						<div className="col">
							<div className="card mb-4 rounded-3 shadow-sm border-danger">
								<div className="card-header py-3 bg-danger">
									<h4 className="my-0 fw-bold text-white"><i className="bi bi-award"></i> Casual</h4>
								</div>
								<div className="card-body">
									<h1 className="card-title pricing-card-title">$1.99<small className="text-muted fw-light">/month</small></h1>
									<ul className="list-unstyled mt-3 mb-4">
										<li>20 users included</li>
										<li>10 GB of storage</li>
										<li>Priority email support</li>
										<li>Help center access</li>
									</ul>
									<a href="/checkout" type="button" className="w-100 btn btn-lg btn-outline-danger">Let's Go</a>
								</div>
							</div>
						</div>
						<div className="col">
							<div className="card mb-4 rounded-3 shadow-sm border-primary">
								<div className="card-header py-3 text-white border-primary bg-primary">
									<h4 className="my-0 fw-bold text-white"><i className="bi bi-award"></i>Pro</h4>
								</div>
								<div className="card-body">
									<h1 className="card-title pricing-card-title">$4.99<small className="text-muted fw-light">/month</small></h1>
									<ul className="list-unstyled mt-3 mb-4">
										<li>30 users included</li>
										<li>15 GB of storage</li>
										<li>Phone and email support</li>
										<li>Help center access</li>
										<li>30 users included</li>
										<li>15 GB of storage</li>
										<li>Phone and email support</li>
										<li>Help center access</li>
									</ul>
									<a href="/checkout" type="button" className="w-100 btn btn-lg btn-outline-primary">Let's Go</a>
								</div>
							</div>
						</div>
					</div>

				</main>
			</div>
		</div>
	);
}

const containerPricing: CSSProperties = {
	marginTop: '50px'
}
