interface AlertError {
	error: string | null | undefined
}

export default function ErrorAlertMessage({ error }: AlertError) {
  	if (!error) return null;
  	return <p className="fw-bold fs-4 text-center alert alert-danger" role="alert">{error}</p>;
};
