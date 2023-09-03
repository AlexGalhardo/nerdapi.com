interface AlertSuccess {
    message: string | null | undefined | boolean;
}

export default function SuccessAlertMessage({ message }: AlertSuccess) {
    if (!message) return null;
    return (
        <p className="mt-3 fw-bold fs-4 text-center alert alert-success" role="alert">
            {message}
        </p>
    );
}
