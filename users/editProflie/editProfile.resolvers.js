import { createWriteStream } from "fs";
import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
    // currying: 다른 함수를 리턴하는 함수? 에 사용되는 방법? -> func(arg)(arg)
    // 아래의 'protectedResolver'는 서버가 시작될 떄 실행.
    // 그 이후 요청이 들어오면, resolver가 포함된 함수를 실행.
    Mutation: {
        editProfile: protectedResolver(
            async (
                _,
                {
                    firstName,
                    lastName,
                    username,
                    email,
                    password: newPassword,
                    bio,
                    avatar,
                },
                // 모든 resolver가 이용할 수 있는, Apollo가 제공하는 context.
                { loggedInUser }
            ) => {
                const { filename, createReadStream } = await avatar;
                const readStream = createReadStream();
                const writeStream = createWriteStream(
                    `${process.cwd()}/uploads/${filename}`
                );
                readStream.pipe(writeStream);
                let uglyPassword = null;
                if (newPassword) {
                    uglyPassword = await bcrypt.hash(newPassword, 10);
                }
                const updatedUser = await client.user.update({
                    where: {
                        // todo: validate real id
                        id: loggedInUser.id,
                    },
                    data: {
                        firstName,
                        lastName,
                        username,
                        email,
                        bio,
                        avatar: "",
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
            }
        ),
    },
};
