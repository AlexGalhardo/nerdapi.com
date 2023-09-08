interface AlertError {
    error: string | null | undefined;
}

export default function ErrorAlertMessage({ error }: AlertError) {
    if (!error) return null;
    return (
        <p className="fw-bold fs-3 text-center alert alert-danger mb-5" role="alert">
            {error}
        </p>
    );
}
