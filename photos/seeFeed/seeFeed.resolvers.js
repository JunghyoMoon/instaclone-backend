import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Query: {
        seeFeed: protectedResolver((_, { lastId }, { loggedInUser }) =>
            client.photo.findMany({
                where: {
                    OR: [
                        // 팔로워 목록에 내 아이디가 있는 유저들의 사진 찾기
                        {
                            user: {
                                followers: {
                                    some: {
                                        id: loggedInUser.id,
                                    },
                                },
                            },
                        },
                        // 또는 내가 올린거. 내 사진도 피드에 뜨니까!
                        {
                            userId: loggedInUser.id,
                        },
                    ],
                },
                orderBy: {
                    // 최신 순으로 보기 위해 내림차순
                    createdAt: "desc",
                },
                take: 4,
                skip: lastId ? 1 : 0,
                ...(lastId && { cursor: { id: lastId } }),
            })
        ),
    },
};
