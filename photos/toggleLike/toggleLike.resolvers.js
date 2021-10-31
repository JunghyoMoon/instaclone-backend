import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        toggleLike: protectedResolver(async (_, { id }, { loggedInUser }) => {
            const photo = client.photo.findUnique({ where: { id } });

            if (!photo) {
                return {
                    ok: false,
                    error: "Photo not found",
                };
            }

            const likeWhereObj = {
                // 두 필드를 합쳐 unique한 값을 만들어 둔 것.(constraint 기억나니?)
                photoId_userId: {
                    userId: loggedInUser.id,
                    photoId: id,
                },
            };

            const like = await client.like.findUnique({
                where: likeWhereObj,
            });

            if (like) {
                await client.like.delete({
                    where: likeWhereObj,
                });
            } else {
                await client.like.create({
                    data: {
                        user: {
                            connect: {
                                id: loggedInUser.id,
                            },
                        },
                        photo: {
                            connect: {
                                id: photo.id,
                            },
                        },
                    },
                });
            }

            return {
                ok: true,
            };
        }),
    },
};
