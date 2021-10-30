import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

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
                    // 외부 관계? 는 가져오지 않기 때문에, 이렇게 참조해 주어야 함.
                    include: {
                        hashtags: {
                            select: {
                                hashtag: true,
                            },
                        },
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
                            connectOrCreate: processHashtags(caption),
                        },
                    },
                });
            }
        ),
    },
};
