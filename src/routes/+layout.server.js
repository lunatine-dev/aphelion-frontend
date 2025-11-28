import { redirect } from "@sveltejs/kit";
import { PUBLIC_API_URL } from "$env/static/public";

export async function load({ locals, cookies, fetch, url }) {
    if (!locals.user && cookies.get("refreshToken")) {
        const refreshRes = await fetch(PUBLIC_API_URL + "/tokens/refresh", {
            method: "POST",
            body: JSON.stringify({ refreshToken: cookies.get("refreshToken") }),
            headers: { "Content-Type": "application/json" },
        });

        if (refreshRes.ok) {
            const { accessToken, refreshToken, user } = await refreshRes.json();
            cookies.set("accessToken", accessToken, {
                path: "/",
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 1800 * 2,
            });
            cookies.set("refreshToken", refreshToken, {
                path: "/",
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 2_592_000,
            });

            locals.user = user;
        }
    }
}
