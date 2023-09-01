import { useCallback, useEffect, useState, createContext, useMemo, useReducer } from "react";
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from "../Api";
import { useNavigate } from "react-router-dom";
import { DispatchActionType } from "./GlobalStateContext";

export const UserContext = createContext<UserStateContextPort | undefined>(undefined);

interface DispatchAction {
    type: DispatchActionType;
    payload: { wallIndex: number; totalFreeWallAreaToPaint?: number; hasWallBusinessRulesErrors?: boolean };
}

interface UserState {
    test: string;
}

interface UserStateContextPort {
    userLogin: (username: string, password: string) => Promise<void>;
    userLogout: () => Promise<void>;
    data: any | null;
    error: string | null;
	loading: boolean;
	login: null | boolean;
    // userState: UserState;
    // dispatch: React.Dispatch<DispatchAction>;
}

export const UserStateProvider = ({ children }: React.PropsWithChildren) => {
    const [data, setData] = useState<any | null>(null);
    const [login, setLogin] = useState<null | boolean>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const userLogout = useCallback(async function () {
        setData(null);
        setError(null);
        setLoading(false);
        setLogin(false);
        window.localStorage.removeItem("token");
    }, []);

    async function getUser(token: string) {
        const { url, options } = USER_GET(token);
        const response = await fetch(url, options);
        const json = await response.json();
        setData(json);
        setLogin(true);
    }

    async function userLogin(username: string, password: string) {
        try {
            setError(null);
            setLoading(true);
            const { url, options } = TOKEN_POST({ username, password });
            const tokenRes = await fetch(url, options);
            if (!tokenRes.ok) throw new Error(`Error: ${tokenRes.statusText}`);
            const { token } = await tokenRes.json();
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
            const token = window.localStorage.getItem("token");
            if (token) {
                try {
                    setError(null);
                    setLoading(true);
                    const { url, options } = TOKEN_VALIDATE_POST(token);
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
    }, [userLogout]);

    const startUserState: UserState = {
        test: "ola",
    };

    const reducer = (userState: UserState, action: DispatchAction): UserState => {
        switch (action.type) {
            case DispatchActionType.UPDATE_FREE_AREA_TO_PAINT:
                console.log("teste");

                return { ...userState, ...action };

            case DispatchActionType.HAS_WALL_BUSINESS_RULES_ERROR:
                console.log("ola");

                return { ...userState, ...action };

            default:
                return { ...userState, ...action };
        }
    };

    const [userState, dispatch] = useReducer(reducer, startUserState);

    const contextValue = useMemo(() => {
        return { userState, dispatch };
    }, [userState, dispatch]);

    // { userLogin, userLogout, data, error, loading, login }

    return (
        <UserContext.Provider value={{ userLogin, userLogout, data, error, loading, login }}>
            {children}
        </UserContext.Provider>

        // return <GlobalStateContext.Provider value={contextValue}>{children}</GlobalStateContext.Provider>;
    );
};
