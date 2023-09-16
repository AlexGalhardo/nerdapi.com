import { API_URL } from "./Utils/Envs";

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
        url: API_URL + "/check-user-jwt-token",
        options: {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
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

export function FORGET_PASSWORD(email: string) {
    return {
        url: API_URL + "/forget-password",
        options: {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
            }),
        },
    };
}

export function RESET_PASSWORD(resetPasswordToken: string, newPassword: string, confirmNewPassword: string) {
    return {
        url: `${API_URL}/reset-password/${resetPasswordToken}`,
        options: {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                newPassword,
                confirmNewPassword,
            }),
        },
    };
}

export function CHECK_RESET_PASSWORD_TOKEN(resetPasswordToken: string) {
    return {
        url: `${API_URL}/check-reset-password-token`,
        options: {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                resetPasswordToken,
            }),
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
