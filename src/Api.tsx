export const API_URL = "https://microsaas-api.alexgalhardo.com";

export function USER_LOGIN(body: any) {
    return {
        url: API_URL + "/login",
        options: {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        },
    };
}

export function USER_LOGOUT(token: string) {
    return {
        url: API_URL + "/logout",
        options: {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
				Authorization: "Bearer " + token,
            },
        },
    };
}

export function TOKEN_VALIDATE_POST(token: string) {
    return {
        url: API_URL + "/jwt-auth/v1/token/validate",
        options: {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
            },
        },
    };
}

export function USER_GET(token: string) {
    return {
        url: API_URL + "/api/user",
        options: {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
            },
        },
    };
}

export function REGISTER_USER(body: any) {
    return {
        url: API_URL + "/register",
        options: {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        },
    };
}

export function PASSWORD_LOST(body: any) {
    return {
        url: API_URL + "/api/password/lost",
        options: {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        },
    };
}

export function PASSWORD_RESET(body: any) {
    return {
        url: API_URL + "/api/password/reset",
        options: {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        },
    };
}

export function STATS_GET() {
    return {
        url: API_URL + "/api/stats",
        options: {
            method: "GET",
            headers: {
                Authorization: "Bearer " + window.localStorage.getItem("token"),
            },
        },
    };
}
