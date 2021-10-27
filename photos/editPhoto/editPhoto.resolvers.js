import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        editPhoto: protectedResolver(
            async (_, { id, caption }, { loggedInUser }) => {
                // findUnique: 'unique'한 요소로만 찾을 수 있음?
                // findFirst: 기준에 맞는 첫번째 요소 반환
                const oldPhoto = await client.photo.findFirst({
                    where: {
                        id,
                        userId: loggedInUser.id,
                    },
                    include: {
                        hashtags: true,
                    },
                });

                if (!oldPhoto) {
                    return {
                        ok: false,
                        error: "photo not found (or, this is not your photo.)",
                    };
                }

                const photo = await client.photo.update({
                    where: { id },
                    data: {
                        caption,
                        hashtags: {
                            // 기존에 있던 hashtag들과의 연결 해제(삭제)
                            disconnect: oldPhoto.hashtags,
                            // todo: generate new hashtags
                        },
                    },
                });
            }
        ),
    },
};
