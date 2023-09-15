export const API_URL =
    import.meta.env.VITE_NODE_ENV === "development" ? "http://localhost:4000" : "https://api.nerdapi.com";

export const APP_NAME = import.meta.env.VITE_APP_NAME ?? "NerdAPI";
