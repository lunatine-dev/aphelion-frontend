import { redirect } from "@sveltejs/kit";
import { JWT_SECRET } from "$env/static/private";
import jwt from "jsonwebtoken";

export const load = async ({ params, locals, cookies }) => {
    const accessToken = cookies.get("accessToken");

    try {
        jwt.verify(accessToken, JWT_SECRET);

        return { repo: params.repo };
    } catch (err) {
        console.error(err);
        throw redirect(307, "/github/repositories");
    }
};
