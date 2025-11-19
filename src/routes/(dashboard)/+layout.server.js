import { redirect } from "@sveltejs/kit";
import { PUBLIC_API_URL } from "$env/static/public";

export async function load({ locals, cookies, fetch, url }) {
    if (!locals?.user) throw redirect(303, "/");

    return { user: locals.user, accessToken: cookies.get("accessToken") };
}
