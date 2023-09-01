export const API_URL = "https://dogsapi.origamid.dev/json";

export function TOKEN_POST(body: any) {
    return {
        url: API_URL + "/jwt-auth/v1/token",
        options: {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
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

export function USER_POST(body: any) {
    return {
        url: API_URL + "/api/user",
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
