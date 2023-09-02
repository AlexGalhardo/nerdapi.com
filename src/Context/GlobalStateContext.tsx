import {  createContext, useContext, useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
interface GlobalState {
    FLASH_MESSAGES: {
		YOU_NEED_TO_LOGIN_FIRST: boolean | string
		YOU_ARE_ALREADY_LOGGED_IN: boolean | string
	},
	LOGGED_IN: boolean,
	TOKEN: string | undefined,
	NAME: string | undefined
	EMAIL: string | undefined
	TELEGRAM_NUMBER: string | undefined
	API_TOKEN: string | undefined
	ACCEPTED_TO_RECEIVE_NEWSLETTER: boolean,
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

export enum DispatchActionType {
    YOU_NEED_TO_LOGIN_FIRST,
	YOU_ARE_ALREADY_LOGGED_IN,
	LOGIN,
	LOGOUT
}

interface DispatchAction {
    type: DispatchActionType;
    payload?: {  };
}

interface GlobalStateContextPort {
	userLogin: (username?: string, password?: string) => Promise<Element | undefined>;
    globalState: GlobalState;
}

const GlobalStateContext = createContext<GlobalStateContextPort | undefined>(undefined);

export const GlobalStateProvider = ({ children }: React.PropsWithChildren) => {
	const navigate = useNavigate();
	// const [changed, setChanged] = useState<boolean>()
    const [globalState, setGlobalState] = useState<GlobalState>({
        FLASH_MESSAGES: {
			YOU_NEED_TO_LOGIN_FIRST: false,
			YOU_ARE_ALREADY_LOGGED_IN: false
		},
		LOGGED_IN: false,
		TOKEN: undefined,
		NAME: 'Alex Galhardo',
		EMAIL: 'alex@gmail.com',
		TELEGRAM_NUMBER: '+55 18 996971459',
		API_TOKEN: 'apskdpoaskopd',
		ACCEPTED_TO_RECEIVE_NEWSLETTER: true,
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
    });

	async function userLogin(username?: string, password?: string): Promise<any> {
    	try {
			// setGlobalState({
			// 	...globalState,
			// 	LOGGED_IN: true,
			// 	TOKEN: 'jwttokenlogin'
			// })
			window.localStorage.setItem('USER', JSON.stringify({
				...globalState,
				LOGGED_IN: true,
				TOKEN: 'jwttokenlogin'
			}));
			return navigate("/profile");
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		if(window.localStorage.getItem('USER')) setGlobalState(JSON.parse(window.localStorage.getItem('USER') as string))
	}, [])

	// if(window.localStorage.getItem('USER')) setGlobalState(JSON.parse(window.localStorage.getItem('USER') as string))

    return <GlobalStateContext.Provider value={{globalState, userLogin }}>{children}</GlobalStateContext.Provider>;
};

export const useGlobalState = (): GlobalStateContextPort => {
    const context = useContext(GlobalStateContext);
    if (!context) {
        throw new Error("useGlobalState must be used inside GlobalStateProvider");
    }
    return context;
};
