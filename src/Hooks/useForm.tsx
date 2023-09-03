import { useState } from "react";

function isPasswordSecure(password: string) {
    // Check if the password meets the following criteria:
    // 1. At least 8 characters long
    // 2. Contains at least one lowercase letter
    // 3. Contains at least one uppercase letter
    // 4. Contains at least one digit (0-9)
    // 5. Contains at least one special character (e.g., !@#$%^&*)

    const lengthRegex = /^.{8,}$/;
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const digitRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*]/;

    return (
        lengthRegex.test(password) &&
        lowercaseRegex.test(password) &&
        uppercaseRegex.test(password) &&
        digitRegex.test(password) &&
        specialCharRegex.test(password)
    );
}

function isValidEmail(email: string) {
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

const types = {
    email: {
        regex: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i,
        message: "Digit a valid email",
    },
    password: {
        // regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
        message: "The password must have 8 characters, 1 uppercase, 1 lowercase and 1 digit",
    },
    number: {
        regex: /^\d+$/,
        message: "Only numbers",
    },
};

export default function useForm(type: "email" | "password" | "number" | "text") {
    const [value, setValue] = useState("");
    const [error, setError] = useState<null | string>(null);

    function validate(value: string) {
        if (typeof type === "number") return true;
        if (value.length === 0) {
            setError("Waiting input value...");
            return false;
        } else if (type === "password" && !isPasswordSecure(value)) {
            setError(types[type].message);
            return false;
        } else if (type === "email" && !isValidEmail(value)) {
            setError(types[type].message);
            return false;
        } else {
            setError(null);
            return true;
        }
    }

    function onChange({ target }: { target: any }) {
        if (error) validate(target.value);
        setValue(target.value);
    }

    return {
        value,
        setValue,
        onChange,
        error,
        validate: () => validate(value),
        onBlur: () => validate(value),
    };
}
