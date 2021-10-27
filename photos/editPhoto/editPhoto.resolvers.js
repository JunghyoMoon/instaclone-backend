import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        editPhoto: protectedResolver(
            async (_, { id, caption }, { loggedInUser }) => {
                // findUnique: 'unique'한 요소로만 찾을 수 있음?
                // findFirst: 기준에 맞는 첫번째 요소 반환
                const ok = await client.photo.findFirst({
                    where: {
                        id,
                        userId: loggedInUser.id,
                    },
                });

                if (!ok) {
                    return {
                        ok: false,
                        error: "photo not found (or, this is not your photo.)",
                    };
                }
            }
        ),
    },
};
