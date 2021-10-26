import client from "../client";

export default {
    Photo: {
        // computed field를 복습해보자!
        // 현재 보고 있는 사진의 userId (root.userId) 를 이용하여 user 연결
        user: ({ userId }) => {
            return client.user.findUnique({ where: { id: userId } });
        },
        // 현재 사진의 id (root.id) 를 이용하여 hashtag들 찾기
        hashtags: ({ id }) => {
            return client.hashtag.findMany({
                where: {
                    photos: {
                        some: {
                            id,
                        },
                    },
                },
            });
        },
    },
    Hashtag: {
        totalPhotos: ({ id }) =>
            client.photo.count({
                where: {
                    hashtags: {
                        some: {
                            id,
                        },
                    },
                },
            }),
    },
};
