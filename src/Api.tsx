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

export function VALIDATE_TOKEN(token: string) {
    return {
        url: API_URL + "/validate",
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
        url: API_URL + "/user",
        options: {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
            },
        },
    };
}

export function USER_REGISTER(body: any) {
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

export function GET_BLOG_BY_SLUG(slug: string){
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
