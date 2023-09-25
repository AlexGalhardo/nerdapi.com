export const API_URL =
    import.meta.env.VITE_NODE_ENV === "development"
        ? import.meta.env.VITE_API_URL_DEV
        : import.meta.env.VITE_API_URL_PROD;

export const APP_URL =
    import.meta.env.VITE_NODE_ENV === "development"
        ? import.meta.env.VITE_APP_URL_DEV
        : import.meta.env.VITE_APP_URL_PROD;

export const APP_NAME = import.meta.env.VITE_APP_NAME ?? "NerdAPI";

export const TOTAL_GAMES_PER_PAGE = import.meta.env.VITE_TOTAL_GAMES_PER_PAGE ?? 5;
