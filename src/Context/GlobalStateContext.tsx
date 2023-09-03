import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RECOVER_PASSWORD, SEND_CONTACT, USER_LOGIN, USER_REGISTER, VALIDATE_TOKEN } from "../Api";
interface GlobalState {
    FLASH_MESSAGES: {
        YOU_NEED_TO_LOGIN_FIRST: string | undefined;
        USER_ARE_ALREADY_LOGGED_IN: string | undefined;
    };
    USER: {
        LOGGED_IN: boolean;
        TOKEN: string | undefined;
        NAME: string | undefined;
        EMAIL: string | undefined;
        TELEGRAM_NUMBER: string | undefined;
        API_TOKEN: string | undefined;
        ACCEPTED_TO_RECEIVE_NEWSLETTER: false;
        STRIPE: {
            CUSTOMER_ID: string | undefined;
            CARD_ID: string | undefined;
            CARD_LAST_4_DIGITS: string | undefined;
            CARD_EXP_MONTH: string | undefined;
            CARD_EXP_YEAR: string | undefined;
        };
        SUBSCRIPTION: {
            ID: string | undefined;
            CURRENTLY_PLAN: string | undefined;
            STARTED_AT: string | undefined;
            ENDS_AT: string | undefined;
        };
    };
}
interface GlobalStateContextPort {
    error: null | string;
    loading: boolean;
    globalState: GlobalState;
    data: any | null;
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

const GlobalStateContext = createContext<GlobalStateContextPort | undefined>(undefined);

export const GlobalStateProvider = ({ children }: React.PropsWithChildren) => {
    const [data, setData] = useState<any | null>(null);
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
            TOKEN: undefined,
            NAME: undefined,
            EMAIL: undefined,
            TELEGRAM_NUMBER: undefined,
            API_TOKEN: undefined,
            ACCEPTED_TO_RECEIVE_NEWSLETTER: false,
            STRIPE: {
                CUSTOMER_ID: undefined,
                CARD_ID: undefined,
                CARD_LAST_4_DIGITS: undefined,
                CARD_EXP_MONTH: undefined,
                CARD_EXP_YEAR: undefined,
            },
            SUBSCRIPTION: {
                ID: undefined,
                CURRENTLY_PLAN: undefined,
                STARTED_AT: undefined,
                ENDS_AT: undefined,
            },
        },
    });

    const userLogout = useCallback(async function () {
        setGlobalState({
            ...globalState,
            USER: {
                ...globalState.USER,
                LOGGED_IN: false,
            },
        });
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
        window.localStorage.removeItem("token");
    }, []);

    const getUser = useCallback(async function (token: string) {
        const { url, options } = VALIDATE_TOKEN(token);
        const response = await fetch(url, options);
        const json = await response.json();
        setGlobalState({
            ...globalState,
            USER: {
                ...globalState.USER,
                LOGGED_IN: true,
                NAME: json.data.username,
                EMAIL: json.data.email,
            },
        });
        setData(json);
        setLogin(true);
        setGlobalState({
            ...globalState,
            USER: {
                ...globalState.USER,
                NAME: json.data.username,
                EMAIL: json.data.email,
                LOGGED_IN: true,
            },
        });
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
            const { token } = await tokenRes.json();
            window.localStorage.setItem("token", token);
            getUser(token);
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
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            const { token } = await response.json();
            window.localStorage.setItem("token", token);
            getUser(token);
            navigate("/profile");
        } catch (err: any) {
            setError(err.message);
            setLogin(false);
        } finally {
            setLogin(true);
            setLoading(false);
        }
    }

    useEffect(() => {
        async function autoLogin() {
            const token = window.localStorage.getItem("token");
            if (token) {
                try {
                    setError(null);
                    setLoading(true);
                    const { url, options } = VALIDATE_TOKEN(token);
                    const response = await fetch(url, options);
                    if (!response.ok) throw new Error("Token inválido");
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
                globalState,
                userLogin,
                userLogout,
                data,
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
