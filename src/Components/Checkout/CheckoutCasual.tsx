export default function CheckoutCasual() {
    return (
        <>
            <div className="col-lg-6 mt-5 sm-8 text-center">
                <div className="card mb-4 rounded-3 shadow-sm border-danger">
                    <div className="card-header py-3 text-white border-primary bg-danger">
                        <h4 className="my-0 fw-bold text-white">
                            <i className="bi bi-award"></i> Casual
                        </h4>
                    </div>
                    <div className="card-body">
                        <h1 className="card-title pricing-card-title">
                            $1.99<small className="text-muted fw-light">/month</small>
                        </h1>
                        <ul className="list-unstyled mt-3 mb-4">
                            <li>Access to API Token</li>
                            <li>1000 API Requests Day</li>
                            <li>Priority Email Support</li>
                            <li>Help center access</li>
                        </ul>
                    </div>
                </div>

                <br />
            </div>

            <div className="col-lg-6 mt-5">
                <div id="credit-card" className="tab-pane fade show active">
                    <div className="form-group mb-2">
                        <span className="hidden-xs">
                            <h6 className="text-muted small">Card Holder Name</h6>
                        </span>
                        <div className="input-group">
                            <input type="text" className="form-control" name="holder_name" id="holder_name" />
                        </div>
                    </div>

                    <div className="form-group mb-2">
                        <span className="hidden-xs">
                            <h6 className="text-muted small">Card Number</h6>
                        </span>
                        <div className="input-group">
                            <input
                                type="text"
                                name="card_number"
                                placeholder="Credit Card Number"
                                className="form-control"
                                defaultValue="4242424242424242"
                                required
                            />
                            <div className="input-group-append">
                                {" "}
                                <span className="input-group-text text-muted">
                                    {" "}
                                    <i className="bi bi-credit-card h-100"></i>{" "}
                                </span>{" "}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-8">
                            <div className="form-group mt-4">
                                <span className="hidden-xs">
                                    <h6 className="text-muted small">Expiration Date</h6>
                                </span>
                                <div className="input-group">
                                    <input
                                        type="number"
                                        placeholder="Month"
                                        name="card_exp_month"
                                        min="1"
                                        max="12"
                                        step="1"
                                        className="form-control"
                                        defaultValue="08"
                                        required
                                    />
                                    <input
                                        type="number"
                                        placeholder="Year"
                                        name="card_exp_year"
                                        min="2023"
                                        step="1"
                                        className="form-control"
                                        required
                                        defaultValue="2023"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4" style={cvv}>
                            <div className="form-group mb-2">
                                <label
                                    data-toggle="tooltip"
                                    title="Digite os 3 dígitos de segurança atrás do Credit Card."
                                />
                                <h6 className="text-muted small">
                                    CVV
                                    <i className="fa fa-question-circle d-inline"></i>
                                </h6>
                                <input
                                    type="text"
                                    name="card_cvc"
                                    required
                                    className="form-control"
                                    placeholder="Code CVV"
                                    defaultValue="314"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="button btn-lg mt-1 mb-3 mt-3 btn btn-outline-success btn-block w-100"
                        >
                            <span className="fw-bold">Pay USD $ 1.99 / Month</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

const cvv = {
    marginTop: "-8px",
};
