export const API_URL =
    import.meta.env.VITE_NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://api.nerdapi.com";

console.log("API_URL => ", API_URL);

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

export function VALIDATE_TOKEN(token: string) {
    return {
        url: API_URL + "/tokenUser",
        options: {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        },
    };
}

export function USER_GET(token: string) {
    return {
        url: API_URL + "/user",
        options: {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
            },
        },
    };
}

export function SEND_CONTACT(body: any) {
    return {
        url: API_URL + "/contact",
        options: {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        },
    };
}

export function RECOVER_PASSWORD(body: { email: string }) {
    return {
        url: API_URL + "/recover-password",
        options: {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        },
    };
}

export function USER_REGISTER(body: { username: string; email: string; password: string }) {
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

export function GET_BLOG_BY_SLUG(slug: string) {
    return {
        url: API_URL + `/blog/${slug}`,
        options: {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        },
    };
}
