import { useCallback, useEffect, useState, createContext, useMemo, useReducer, useContext } from "react";
import { LOGIN_USER, TOKEN_VALIDATE_POST, USER_GET } from "../Api";
import { useNavigate } from "react-router-dom";

interface UserState {
	LOGGED_IN: boolean,
	NAME: string | undefined
	EMAIL: string | undefined
	TELEGRAM_NUMBER: string | undefined
	API_TOKEN: string | undefined
	STRIPE: {
		CUSTOMER_ID: string | undefined
		CARD_ID: string | undefined
		CARD_LAST_4_DIGITS: string | undefined
		CARD_EXP_MONTH: string | undefined
		CARD_EXP_YEAR: string | undefined
	},
	SUBSCRIPTION: {
		ID: string | undefined
		CURRENTLY_PLAN: string | undefined,
		STARTED_AT: string  | undefined,
		ENDS_AT: string  | undefined
	}
}

export enum DispatchUserActionType {
    YOU_NEED_TO_LOGIN_FIRST,
	YOU_ARE_ALREADY_LOGGED_IN
}

interface DispatchUserAction {
    type: DispatchUserActionType;
}

interface UserStateContextPort {
    userState: UserState;
    userDispatch: React.Dispatch<DispatchUserAction>;
}

const UserStateContext = createContext<UserStateContextPort | undefined>(undefined);

export const UserStateProvider = ({ children }: React.PropsWithChildren) => {
    const [data, setData] = useState<any | null>(null);
    const [userLoggedIn, setuserLoggedIn] = useState<boolean>(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const userLogout = useCallback(async function () {
        setData(null);
        setError(null);
        setLoading(false);
        setuserLoggedIn(false);
        window.localStorage.removeItem("token");
    }, []);

    async function getUser(token: string) {
        const { url, options } = USER_GET(token);
        const response = await fetch(url, options);
        const json = await response.json();
        setData(json);
        setuserLoggedIn(true);
    }

    async function userLogin(username: string, password: string) {
        try {
            setError(null);
            setLoading(true);
            const { url, options } = LOGIN_USER({ username, password });
            const tokenRes = await fetch(url, options);
            if (!tokenRes.ok) throw new Error(`Error: ${tokenRes.statusText}`);
            const { token } = await tokenRes.json();
            window.localStorage.setItem("token", token);
            await getUser(token);
            navigate("/profile");
        } catch (err: any) {
            setError(err.message);
            setuserLoggedIn(false);
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
                setuserLoggedIn(false);
            }
        }
        autoLogin();
    }, [userLogout]);

    const startUserState: UserState = {
		LOGGED_IN: true,
		NAME: 'Alex Galhardo',
		EMAIL: 'alex@gmail.com',
		TELEGRAM_NUMBER: '+55 18 996971459',
		API_TOKEN: 'apskdpoaskopd',
		STRIPE: {
			CUSTOMER_ID: 'poakspoakos',
			CARD_ID: 'apkspoakoaps',
			CARD_LAST_4_DIGITS: '4567',
			CARD_EXP_MONTH: '10',
			CARD_EXP_YEAR: '2023',
		},
		SUBSCRIPTION: {
			ID: 'apskdpoaskopd',
			CURRENTLY_PLAN: 'PRO',
			STARTED_AT: '23/09/2023 14:56:23',
			ENDS_AT: '23/10/2023 14:56:23',
		}
    };

    const reducer = (userState: UserState, action: DispatchUserAction): UserState => {
        switch (action.type) {
			case DispatchUserActionType.YOU_ARE_ALREADY_LOGGED_IN:
				userState.LOGGED_IN = true
                return { ...userState, ...action };

			default:
                return { ...userState, ...action };
        }
    };

    const [userState, userDispatch] = useReducer(reducer, startUserState);

    const contextValue = useMemo(() => {
        return { userState, userDispatch };
    }, [userState, userDispatch]);

    return (
        <UserStateContext.Provider value={contextValue}>
            {children}
        </UserStateContext.Provider>
    );
};

export const useUserState = (): UserStateContextPort => {
    const context = useContext(UserStateContext);
    if (!context) {
        throw new Error("useUserState must be used inside UserStateProvider");
    }
    return context;
};
