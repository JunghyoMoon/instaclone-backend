import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";

export default {
    Mutation: {
        editProfile: async (
            _,
            { firstName, lastName, username, email, password: newPassword },
            // 모든 resolver가 이용할 수 있는, Apollo가 제공하는 context.
            { token }
        ) => {
            console.log(token);
            // token을 key(서명)를 이용하여 해독함.
            const { id } = await jwt.verify(token, process.env.SECRET_KEY);
            let uglyPassword = null;
            if (newPassword) {
                uglyPassword = await bcrypt.hash(newPassword, 10);
            }
            const updatedUser = await client.user.update({
                where: {
                    // todo: validate real id
                    id,
                },
                data: {
                    firstName,
                    lastName,
                    username,
                    email,
                    // &&연산자의 좌항이 true이면, 뒤의 객체가 반환.
                    // 그리고 나서 ...를 이용하여 풀어줌(spread).
                    ...(uglyPassword && { password: uglyPassword }),
                },
            });

            if (updatedUser.id) {
                return {
                    ok: true,
                };
            } else {
                return {
                    ok: false,
                    error: "couldn't update profile.",
                };
            }
        },
    },
};
