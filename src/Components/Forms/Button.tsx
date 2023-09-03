interface FormButton {
    children: React.ReactNode;
    disabled?: boolean;
}

export default function Button({ children, ...props }: FormButton) {
    return (
        <button
            disabled={props?.disabled}
            {...props}
            className="fs-4 button mb-3 w-100 btn btn-outline-success btn-lg btn-block login-btn fw-bold"
        >
            {children}
        </button>
    );
}
