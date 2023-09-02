import { createContext, useContext, useMemo, useReducer } from "react";
interface GlobalState {
    FLASH_MESSAGES: {
		YOU_NEED_TO_LOGIN_FIRST: boolean | string
		YOU_ARE_ALREADY_LOGGED_IN: boolean | string
	}
}

export enum DispatchActionType {
    YOU_NEED_TO_LOGIN_FIRST,
	YOU_ARE_ALREADY_LOGGED_IN
}

interface DispatchAction {
    type: DispatchActionType;
    payload?: {  };
}

interface GlobalStateContextPort {
    globalState: GlobalState;
    globalDispatch: React.Dispatch<DispatchAction>;
}

const GlobalStateContext = createContext<GlobalStateContextPort | undefined>(undefined);

export const GlobalStateProvider = ({ children }: React.PropsWithChildren) => {
    const startGlobalState: GlobalState = {
        FLASH_MESSAGES: {
			YOU_NEED_TO_LOGIN_FIRST: false,
			YOU_ARE_ALREADY_LOGGED_IN: false
		}
    };

    const reducer = (globalState: GlobalState, action: DispatchAction): GlobalState => {
        switch (action.type) {

			case DispatchActionType.YOU_NEED_TO_LOGIN_FIRST:
                globalState.FLASH_MESSAGES.YOU_NEED_TO_LOGIN_FIRST = "You need to login first"
				globalState.FLASH_MESSAGES.YOU_ARE_ALREADY_LOGGED_IN = false
                return { ...globalState, ...action };


			case DispatchActionType.YOU_ARE_ALREADY_LOGGED_IN:
                globalState.FLASH_MESSAGES.YOU_ARE_ALREADY_LOGGED_IN = "You are already logged in"
				globalState.FLASH_MESSAGES.YOU_NEED_TO_LOGIN_FIRST = false
                return { ...globalState, ...action };

			default:
                return { ...globalState, ...action };
        }
    };

    const [globalState, globalDispatch] = useReducer(reducer, startGlobalState);

    const contextValue = useMemo(() => {
        return { globalState, globalDispatch };
    }, [globalState, globalDispatch]);

    return <GlobalStateContext.Provider value={contextValue}>{children}</GlobalStateContext.Provider>;
};

export const useGlobalState = (): GlobalStateContextPort => {
    const context = useContext(GlobalStateContext);
    if (!context) {
        throw new Error("useGlobalState must be used inside GlobalStateProvider");
    }
    return context;
};
