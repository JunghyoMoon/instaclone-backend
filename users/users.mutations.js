import bcrypt from "bcrypt";
import client from "../client";

export default {
    Mutation: {
        createAccount: async (
            _,
            { firstName, lastName, username, email, password }
        ) => {
            try {
                // check if username or email are already exist on DB.
                const existingUser = await client.user.findFirst({
                    where: {
                        OR: [
                            {
                                username,
                            },
                            {
                                email,
                            },
                        ],
                    },
                });
                if (existingUser) {
                    throw new Error(
                        "this username/email have been taken already."
                    );
                }
                // if not : hash(난독화?) password, (이미 해쉬된 문자열은 다시 복원 불가.)
                const uglyPassword = await bcrypt.hash(password, 10);
                // then, save and return user.
                return client.user.create({
                    data: {
                        username,
                        email,
                        firstName,
                        lastName,
                        password: uglyPassword,
                    },
                });
            } catch (error) {
                return error;
            }
        },
    },
};
