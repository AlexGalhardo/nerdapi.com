import { createContext, useCallback, useContext, useMemo, useReducer } from "react";
interface GlobalState {
    test: string
}

export enum DispatchActionType {
    UPDATE_FREE_AREA_TO_PAINT,
    HAS_WALL_BUSINESS_RULES_ERROR,
}

interface DispatchAction {
    type: DispatchActionType;
    payload: { wallIndex: number; totalFreeWallAreaToPaint?: number; hasWallBusinessRulesErrors?: boolean };
}

interface GlobalStateContextPort {
    globalState: GlobalState;
    dispatch: React.Dispatch<DispatchAction>;
}

const GlobalStateContext = createContext<GlobalStateContextPort | undefined>(undefined);

export const useData = () => {
    const context = useContext(GlobalStateContext);
    if (!context) throw new Error("useData must be used in a component inside GlobalStateProvider");
    return context;
};

export const GlobalStateProvider = ({ children }: React.PropsWithChildren) => {
    const startGlobalState: GlobalState = {
        test: 'ola'
    };

    const reducer = (globalState: GlobalState, action: DispatchAction): GlobalState => {
        switch (action.type) {
            case DispatchActionType.UPDATE_FREE_AREA_TO_PAINT:
                console.log('teste')

                return { ...globalState, ...action };

            case DispatchActionType.HAS_WALL_BUSINESS_RULES_ERROR:
                console.log('ola')

                return { ...globalState, ...action };

            default:
                return { ...globalState, ...action };
        }
    };

    const [globalState, dispatch] = useReducer(reducer, startGlobalState);

    const contextValue = useMemo(() => {
        return { globalState, dispatch };
    }, [globalState, dispatch]);

    return <GlobalStateContext.Provider value={contextValue}>{children}</GlobalStateContext.Provider>;
};

export const useGlobalState = (): GlobalStateContextPort => {
    const context = useContext(GlobalStateContext);
    if (!context) {
        throw new Error("useGlobalState must be used inside GlobalStateProvider");
    }
    return context;
};
