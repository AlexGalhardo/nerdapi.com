import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, RECOVER_PASSWORD, SEND_CONTACT, USER_LOGIN, USER_REGISTER, VALIDATE_TOKEN } from "../Api";
interface GlobalState {
    FLASH_MESSAGES: {
        YOU_NEED_TO_LOGIN_FIRST: string | undefined;
        USER_ARE_ALREADY_LOGGED_IN: string | undefined;
    };
    USER: {
        LOGGED_IN: boolean;
    };
}
interface GlobalStateContextPort {
    error: null | string;
    loading: boolean;
    globalState: GlobalState;
    user: any | null;
    login: null | boolean;
    contactSend: boolean;
    sendRecoverPassword: boolean;
    userLogin: (username: string, password: string) => Promise<Element | undefined>;
    userLogout: () => Promise<void>;
    sendContact: (name: string, email: string, subject: string, message: string) => Promise<any>;
    getUser: (token: string) => Promise<void>;
    userRegister: (username: string, email: string, password: string) => Promise<any>;
    recoverPassword: (email: string) => Promise<any>;
}

export interface User {
    id: string | null;
    username: string | null;
    email: string | null;
    telegram_number: string | null;
    password: string | null;
    jwt_token: string | null;
    api_token: string | null;
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

const GlobalStateContext = createContext<GlobalStateContextPort | undefined>(undefined);

export const GlobalStateProvider = ({ children }: React.PropsWithChildren) => {
    const [user, setUser] = useState<User>({
        id: null,
        username: null,
        email: null,
        telegram_number: null,
        password: null,
        jwt_token: null,
        api_token: null,
        reset_password_token: null,
        reset_password_token_expires_at: null,
        stripe: {
            customer_id: null,
            subscription: {
                active: false,
                name: null,
                starts_at: null,
                ends_at: null,
                charge_id: null,
                receipt_url: null,
                hosted_invoice_url: null,
            },
            updated_at: null,
            updated_at_pt_br: null,
        },
        created_at: null,
        updated_at: null,
        created_at_pt_br: null,
        updated_at_pt_br: null,
    });
    const [login, setLogin] = useState<null | boolean>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<null | string>(null);
    const [contactSend, setContactSend] = useState<boolean>(false);
    const [sendRecoverPassword, setSendRecoverPassword] = useState<boolean>(false);
    const navigate = useNavigate();

    const [globalState, setGlobalState] = useState<GlobalState>({
        FLASH_MESSAGES: {
            YOU_NEED_TO_LOGIN_FIRST: "You need to login first",
            USER_ARE_ALREADY_LOGGED_IN: "You are already logged in",
        },
        USER: {
            LOGGED_IN: false,
        },
    });

    const userLogout = useCallback(async function () {
        setError(null);
        setLoading(false);
        setLogin(false);
        setGlobalState({
            ...globalState,
            USER: {
                ...globalState.USER,
                LOGGED_IN: false,
            },
        });
        //window.localStorage.removeItem("token");
    }, []);

    const getUser = useCallback(async function (token: string) {
        const response = await fetch(`${API_URL}/tokenUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const json = await response.json();
        console.log("json.data é => ", json.data);
        setUser({
            id: json.data.id,
            username: json.data.username,
            email: json.data.email,
            telegram_number: json.data.telegram_number,
            password: json.data.password,
            jwt_token: json.data.jwt_token,
            api_token: json.data.api_token,
            reset_password_token: json.data.reset_password_token,
            reset_password_token_expires_at: json.data.reset_password_token_expires_at,
            stripe: {
                customer_id: json.data.stripe.customer_id,
                subscription: {
                    active: json.data.stripe.subscription.active,
                    name: json.data.stripe.subscription.name,
                    starts_at: json.stripe.subscription.starts_at,
                    ends_at: json.data.stripe.subscription.ends_at,
                    charge_id: json.data.stripe.subscription.charge_id,
                    receipt_url: json.data.stripe.subscription.receipt_url,
                    hosted_invoice_url: json.stripe.subscription.hosted_invoice_url,
                },
                updated_at: json.data.stripe.updated_at,
                updated_at_pt_br: json.data.stripe.updated_at_pt_br,
            },
            created_at: json.data.created_at,
            updated_at: json.data.updated_at,
            created_at_pt_br: json.data.created_at_pt_br,
            updated_at_pt_br: json.data.updated_at_pt_br,
        });

        console.log("user é => ", user);

        window.localStorage.setItem("token", token);

        setGlobalState({
            ...globalState,
            USER: {
                ...globalState.USER,
                LOGGED_IN: true,
            },
        });
        console.log("globalState é => ", globalState);

        setLogin(true);
    }, []);

    async function sendContact(name: string, email: string, subject: string, message: string): Promise<any> {
        try {
            setError(null);
            setLoading(true);
            const { url, options } = SEND_CONTACT({ name, email, subject, message });
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        } catch (err: any) {
            setError(err.message);
            setContactSend(false);
        } finally {
            setContactSend(true);
            setLoading(false);
        }
    }

    async function recoverPassword(email: string): Promise<any> {
        try {
            setError(null);
            setLoading(true);
            const { url, options } = RECOVER_PASSWORD({ email });
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        } catch (err: any) {
            setError(err.message);
            setSendRecoverPassword(true);
        } finally {
            setSendRecoverPassword(true);
            setLoading(false);
        }
    }

    async function userLogin(email: string, password: string): Promise<any> {
        try {
            setError(null);

            setLoading(true);

            const { url, options } = USER_LOGIN({ email, password });

            const tokenRes = await fetch(url, options);

            if (!tokenRes.ok) throw new Error(`Error: ${tokenRes.statusText}`);

            const { jwt_token } = await tokenRes.json();

            window.localStorage.setItem("token", jwt_token);

            const response = await fetch(`${API_URL}/tokenUser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt_token}`,
                },
            });
            const json = await response.json();
            setUser({
                id: json.data.id,
                username: json.data.username,
                email: json.data.email,
                telegram_number: json.data.telegram_number,
                password: json.data.password,
                jwt_token: json.data.jwt_token,
                api_token: json.data.api_token,
                reset_password_token: json.data.reset_password_token,
                reset_password_token_expires_at: json.data.reset_password_token_expires_at,
                stripe: {
                    customer_id: json.data.stripe.customer_id,
                    subscription: {
                        active: json.data.stripe.subscription.active,
                        name: json.data.stripe.subscription.name,
                        starts_at: json.stripe.subscription.starts_at,
                        ends_at: json.data.stripe.subscription.ends_at,
                        charge_id: json.data.stripe.subscription.charge_id,
                        receipt_url: json.data.stripe.subscription.receipt_url,
                        hosted_invoice_url: json.stripe.subscription.hosted_invoice_url,
                    },
                    updated_at: json.data.stripe.updated_at,
                    updated_at_pt_br: json.data.stripe.updated_at_pt_br,
                },
                created_at: json.data.created_at,
                updated_at: json.data.updated_at,
                created_at_pt_br: json.data.created_at_pt_br,
                updated_at_pt_br: json.data.updated_at_pt_br,
            });
            setGlobalState({
                ...globalState,
                USER: {
                    ...globalState.USER,
                    LOGGED_IN: true,
                },
            });
            setLogin(true);

            navigate("/profile");
        } catch (err: any) {
            setError(err.message);
            setLogin(false);
        } finally {
            setLoading(false);
        }
    }

    async function userRegister(username: string, email: string, password: string): Promise<any> {
        try {
            setError(null);
            setLoading(true);
            const { url, options } = USER_REGISTER({ username, email, password });
            console.log("\n chegou ANTES do response....");
            const response = await fetch(url, options);
            console.log("\n chegou depois do response....");
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            const { token } = await response.json();
            window.localStorage.setItem("token", token);
            await getUser(token);
            navigate("/profile");
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

            if (urlSearchParams.get("token")) token = urlSearchParams.get("token");
            if (window.localStorage.getItem("token")) token = window.localStorage.getItem("token");

            if (token) {
                try {
                    setError(null);
                    setLoading(true);
                    const response = await fetch(`${API_URL}/tokenUser`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (!response.ok) throw new Error("Invalid JWT Token");
                    window.localStorage.setItem("token", token);
                    await getUser(token);
                } catch (err) {
                    console.log("\n err => ", err);
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
                globalState,
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
                recoverPassword,
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
