export default function Newsletter() {
    return (
        <>
            <p className="small text-muted text-center">Receive new updates with our monthly newsletter!</p>
            <form action="#">
                <div className="input-group mb-3">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Digit your email"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                    />
                    <button className="btn btn-outline-success fw-bold" id="button-addon2" type="button">
                        Lets Goo!
                    </button>
                </div>
            </form>
        </>
    );
}
