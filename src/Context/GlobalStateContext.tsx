import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../Utils/Envs";

export interface ProfileUpdateDTO {
    username?: string | null;
    telegramNumber?: string | null;
    newPassword?: string | null;
    confirmNewPassword?: string | null;
}

export interface User {
    id: string | null;
    username: string | null;
    email: string | null;
    telegram_number: string | null;
    password: string | null;
    jwt_token: string | null;
    api_key: string | null;
    reset_password_token: string | null;
    reset_password_token_expires_at: string | null;
    stripe: {
        customer_id: string | null;
        subscription: {
            active: boolean;
            name: string | null;
            starts_at: string | null;
            ends_at: string | null;
            charge_id: string | null;
            receipt_url: string | null;
            hosted_invoice_url: string | null;
        };
        updated_at: string | null;
        updated_at_pt_br: string | null;
    };
    created_at: string | null;
    updated_at: string | null;
    created_at_pt_br: string | null;
    updated_at_pt_br: string | null;
}

interface GlobalStateContextPort {
    error: null | string;
    loading: boolean;
    user: User | null;
    login: null | boolean;
    contactSend: boolean;
    updatedProfile: boolean;
    sendRecoverPassword: boolean;
    sendResetPassword: boolean;
    apiRequestError: string | undefined;
    userLogin: (username: string, password: string) => Promise<Element | undefined>;
    userLogout: () => Promise<void>;
    sendContact: (name: string, email: string, subject: string, message: string) => Promise<any>;
    getUser: (token: string) => Promise<void>;
    userRegister: (username: string, email: string, password: string) => Promise<any>;
    updateProfile({ username, telegramNumber, newPassword, confirmNewPassword }: ProfileUpdateDTO): void;
    forgetPassword: (email: string) => Promise<any>;
    resetPassword(resetPasswordToken: string, newPassword: string, confirmNewPassword: string): Promise<any>;
    isValidResetPasswordToken(resetPasswordToken: string): Promise<boolean>;
}

const GlobalStateContext = createContext<GlobalStateContextPort | undefined>(undefined);

export const GlobalStateProvider = ({ children }: React.PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null);
    const [login, setLogin] = useState<null | boolean>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<null | string>(null);
    const [contactSend, setContactSend] = useState<boolean>(false);
    const [sendRecoverPassword, setSendRecoverPassword] = useState<boolean>(false);
    const [sendResetPassword, setSendResetPassword] = useState<boolean>(false);
    const [updatedProfile, setUpdatedProfile] = useState<boolean>(false);
    const [apiRequestError, setAPIRequestError] = useState<string | undefined>(undefined);
    const navigate = useNavigate();

    const userLogout = useCallback(async function () {
        setUser(null);
        setError(null);
        setLoading(false);
        setLogin(false);
        window.localStorage.removeItem("token");
    }, []);

    async function getUser(token: string) {
        setLogin(true);

        const response = await fetch(`${API_URL}/check-user-jwt-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const { data } = await response.json();

        setUser({
            id: data.id,
            username: data.username,
            email: data.email,
            telegram_number: data.telegram_number,
            password: data.password,
            jwt_token: data.jwt_token,
            api_key: data.api_key,
            reset_password_token: data.reset_password_token,
            reset_password_token_expires_at: data.reset_password_token_expires_at,
            stripe: {
                customer_id: data.stripe.customer_id,
                subscription: {
                    active: data.stripe.subscription.active,
                    name: data.stripe.subscription.name,
                    starts_at: data.stripe.subscription.starts_at,
                    ends_at: data.stripe.subscription.ends_at,
                    charge_id: data.stripe.subscription.charge_id,
                    receipt_url: data.stripe.subscription.receipt_url,
                    hosted_invoice_url: data.stripe.subscription.hosted_invoice_url,
                },
                updated_at: data.stripe.updated_at,
                updated_at_pt_br: data.stripe.updated_at_pt_br,
            },
            created_at: data.created_at,
            updated_at: data.updated_at,
            created_at_pt_br: data.created_at_pt_br,
            updated_at_pt_br: data.updated_at_pt_br,
        });
    }

    async function sendContact(name: string, email: string, subject: string, message: string): Promise<any> {
        try {
            setError(null);
            setLoading(true);
            const response = await fetch(`${API_URL}/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    subject,
                    message,
                }),
            });
            if (!response.ok) {
                const { message } = await response.json();
                setError(message);
            }
        } catch (error: any) {
            setLoading(false);
            setError(error.message);
            setContactSend(false);
        } finally {
            setContactSend(true);
            setLoading(false);
        }
    }

    async function forgetPassword(email: string): Promise<any> {
        try {
            setError(null);
            setLoading(true);
            const response = await fetch(`${API_URL}/forget-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                }),
            });
            if (!response.ok) {
                const { message } = await response.json();
                setError(message);
            }
        } catch (err: any) {
            setError(err.message);
            setSendRecoverPassword(true);
        } finally {
            setSendRecoverPassword(true);
            setLoading(false);
        }
    }

    async function resetPassword(
        resetPasswordToken: string,
        newPassword: string,
        confirmNewPassword: string,
    ): Promise<any> {
        try {
            setError(null);
            setLoading(true);
            const response = await fetch(`${API_URL}/reset-password/${resetPasswordToken}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    newPassword,
                    confirmNewPassword,
                }),
            });
            if (!response.ok) {
                const { message } = await response.json();
                setError(message);
            } else {
                setSendResetPassword(true);
                setTimeout(() => {
                    navigate("/");
                }, 5000);
            }
        } catch (err: any) {
            setError(err.message);
            setSendResetPassword(true);
        } finally {
            setSendResetPassword(true);
            setLoading(false);
        }
    }

    async function isValidResetPasswordToken(resetPasswordToken: string): Promise<any> {
        try {
            const response = await fetch(`${API_URL}/check-reset-password-token`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    resetPasswordToken,
                }),
            });
            const json = await response.json();
            if (!json.success) navigate("/");
        } catch (err: any) {
            setError(err.message);
            navigate("/");
        }
    }

    async function userLogin(email: string, password: string): Promise<any> {
        try {
            setError(null);
            setLoading(true);
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            if (!response.ok) {
                const { message } = await response.json();
                setAPIRequestError(message);
                setError("Email and/or Password Invalid");
            } else {
                const json = await response.json();
                if (json.redirect) {
                    window.location.href = json.redirect;
                }
                window.localStorage.setItem("token", json.jwt_token);
                await getUser(json.jwt_token);
                navigate("/profile");
            }
        } catch (err: any) {
            setError(err.message);
            setLogin(false);
        } finally {
            setLoading(false);
        }
    }

    async function updateProfile({ username, telegramNumber, newPassword, confirmNewPassword }: ProfileUpdateDTO) {
        try {
            setError(null);
            setLoading(true);
            const response = await fetch(`${API_URL}/profile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    username,
                    telegramNumber,
                    newPassword,
                    confirmNewPassword,
                }),
            });

            if (!response.ok) {
                const { message } = await response.json();
                setError(message);
                setUpdatedProfile(false);
                setAPIRequestError(message);
            } else {
                const { data } = await response.json();
                if (user) {
                    setUser({
                        ...user,
                        username: data.username,
                        telegram_number: data.telegramNumber,
                        password: data.password,
                    });
                    setUpdatedProfile(true);
                    setAPIRequestError("");
                }
            }
        } catch (error: any) {
            setError(error.message);
            setLoading(false);
            setUpdatedProfile(false);
        } finally {
            setLoading(false);
        }
    }

    async function userRegister(username: string, email: string, password: string): Promise<any> {
        try {
            setError(null);
            setLoading(true);
            const response = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });
            if (!response.ok) {
                const { message } = await response.json();
                setAPIRequestError(message);
            } else {
                const { jwt_token } = await response.json();
                window.localStorage.setItem("token", jwt_token);
                await getUser(jwt_token);
                navigate("/profile");
            }
        } catch (err: any) {
            setError(err.message);
            setLogin(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        async function autoLogin() {
            const currentUrl = window.location.href;
            const urlSearchParams = new URLSearchParams(currentUrl.split("?")[1]);
            let token = null;
            if (urlSearchParams.get("token")) {
                console.log('urlSearchParams.get("token") ======> ', urlSearchParams.get("token"));
                token = urlSearchParams.get("token");
                window.localStorage.setItem("token", token as string);
            } else if (window.localStorage.getItem("token")) token = window.localStorage.getItem("token");
            if (token) {
                try {
                    setError(null);
                    setLoading(true);
                    await getUser(token);
                } catch (err) {
                    userLogout();
                } finally {
                    setLoading(false);
                }
            } else {
                setLogin(false);
            }
        }
        autoLogin();
    }, []);

    return (
        <GlobalStateContext.Provider
            value={{
                userLogin,
                userLogout,
                user,
                error,
                loading,
                login,
                getUser,
                contactSend,
                sendContact,
                userRegister,
                sendRecoverPassword,
                forgetPassword,
                updateProfile,
                updatedProfile,
                resetPassword,
                sendResetPassword,
                isValidResetPasswordToken,
                apiRequestError,
            }}
        >
            {children}
        </GlobalStateContext.Provider>
    );
};

export const useGlobalState = (): GlobalStateContextPort => {
    const context = useContext(GlobalStateContext);
    if (!context) {
        throw new Error("useGlobalState must be used inside GlobalStateProvider");
    }
    return context;
};
