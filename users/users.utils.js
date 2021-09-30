import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
    try {
        if (!token) {
            return null;
        }
        // token을 key(서명)를 이용하여 해독함.
        const { id } = await jwt.verify(token, process.env.SECRET_KEY);

        const user = await client.user.findUnique({ where: { id } });

        if (user) {
            return user;
        } else {
            return null;
        }
    } catch {
        return null;
    }
};
