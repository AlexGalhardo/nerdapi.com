interface FormError {
	error: string | null | undefined
}

export default function ErrorAlertMessage({ error }: FormError) {
  if (!error) return null;
  return <p className="fw-bold fs-4 text-center alert alert-danger" role="alert">{error}</p>;
};
