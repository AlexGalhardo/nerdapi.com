// import { createContext, useMemo, useReducer, useContext, useState } from "react";

// interface UserState {
// 	LOGGED_IN: boolean,
// 	TOKEN: string | undefined,
// 	NAME: string | undefined
// 	EMAIL: string | undefined
// 	TELEGRAM_NUMBER: string | undefined
// 	API_TOKEN: string | undefined
// 	ACCEPTED_TO_RECEIVE_NEWSLETTER: boolean,
// 	STRIPE: {
// 		CUSTOMER_ID: string | undefined
// 		CARD_ID: string | undefined
// 		CARD_LAST_4_DIGITS: string | undefined
// 		CARD_EXP_MONTH: string | undefined
// 		CARD_EXP_YEAR: string | undefined
// 	},
// 	SUBSCRIPTION: {
// 		ID: string | undefined
// 		CURRENTLY_PLAN: string | undefined,
// 		STARTED_AT: string  | undefined,
// 		ENDS_AT: string  | undefined
// 	}
// }

// export enum DispatchUserActionType {
// 	LOGIN,
// 	LOGOUT
// }

// interface DispatchUserAction {
//     type: DispatchUserActionType;
// 	payload?: {email?: string, password?: string}
// }

// interface UserStateContextPort {
//     userState: UserState;
//     userDispatch: React.Dispatch<DispatchUserAction>;
// }

// const UserStateContext = createContext<UserStateContextPort | undefined>(undefined);

// export const UserStateProvider = ({ children }: React.PropsWithChildren) => {
// 	const [startUserState, setUserState] = useState<UserState>({
// 		LOGGED_IN: false,
// 		TOKEN: undefined,
// 		NAME: 'Alex Galhardo',
// 		EMAIL: 'alex@gmail.com',
// 		TELEGRAM_NUMBER: '+55 18 996971459',
// 		API_TOKEN: 'apskdpoaskopd',
// 		ACCEPTED_TO_RECEIVE_NEWSLETTER: true,
// 		STRIPE: {
// 			CUSTOMER_ID: 'poakspoakos',
// 			CARD_ID: 'apkspoakoaps',
// 			CARD_LAST_4_DIGITS: '4567',
// 			CARD_EXP_MONTH: '10',
// 			CARD_EXP_YEAR: '2023',
// 		},
// 		SUBSCRIPTION: {
// 			ID: 'apskdpoaskopd',
// 			CURRENTLY_PLAN: 'PRO',
// 			STARTED_AT: '23/09/2023 14:56:23',
// 			ENDS_AT: '23/10/2023 14:56:23',
// 		}
//     })

//     const reducer = (userState: UserState, action: DispatchUserAction): UserState => {
//         switch (action.type) {

// 			case DispatchUserActionType.LOGIN:
// 				window.localStorage.setItem("tokenLogin", 'jwttokenlogin');
// 				setUserState({
// 					...startUserState,
// 					LOGGED_IN: true,
// 					TOKEN: 'jwttokenlogin'
// 				})
// 				return { ...startUserState, ...action };

// 			case DispatchUserActionType.LOGOUT:
// 				setUserState({
// 					...startUserState,
// 					LOGGED_IN: false,
// 					NAME: undefined,
// 					EMAIL: undefined
// 				})
// 				window.localStorage.removeItem("tokenLogin");
//                 return { ...startUserState, ...action };

// 			default:
//                 return { ...startUserState, ...action };
//         }
//     };

//     const [userState, userDispatch] = useReducer(reducer, startUserState);

//     const contextValue = useMemo(() => {
// 		console.log('\n VALOR FINAL DE userState é => ', userState)
//         return { userState, userDispatch };
//     }, [userState, userDispatch]);

// 	console.log('')

//     return (
//         <UserStateContext.Provider value={contextValue}>
//             {children}
//         </UserStateContext.Provider>
//     );
// };

// export const useUserState = (): UserStateContextPort => {
//     const context = useContext(UserStateContext);
//     if (!context) {
//         throw new Error("useUserState must be used inside UserStateProvider");
//     }
//     return context;
// };
