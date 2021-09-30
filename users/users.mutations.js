import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

        login: async (_, { username, password }) => {
            // 1. find user with args.username
            const user = await client.user.findFirst({ where: { username } });
            if (!user) {
                return {
                    ok: false,
                    error: "User not found.",
                };
            }
            // 2. if user, check password with args.password === user.password
            const passwordOk = await bcrypt.compare(password, user.password);
            if (!passwordOk) {
                return {
                    ok: false,
                    error: "wrong password!",
                };
            }
            // 3. issue a token(Json Web Token, JWT) and send it.
            // JWT: user id를 가져와서, 토큰에 서명을 함.(서버만의 인감도장같은거?) -> 그걸 브라우저나, 데스크탑 앱 등에 저장해두고 요청할 때마다 유저는 같이 전송.
            //      서버가 토큰을 받으면, 그 토큰이 가진 정보들(id, 서명 등)을 확인하고 -> 우리건지 확인후 요청 처리!
            //      * 토큰은 서버가 프론트엔드에 연결되어 있지 않거나, 따로 떨어져 있을 때 사용함.
            const token = await jwt.sign(
                { id: user.id },
                process.env.SECRET_KEY
            );
            return {
                ok: true,
                token,
            };
        },
    },
};
