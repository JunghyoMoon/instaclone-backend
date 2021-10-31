import client from "../../client";

export default {
    Query: {
        seePhotoLikes: async (_, { id }) => {
            const likes = await client.like.findMany({
                where: { photoId: id },
                // select와 include의 차이?
                // include: 결과에 relationship을 추가해줌.
                // select: 그냥.. 받고 싶은 걸 '선택' 하는 것.
                select: {
                    user: true,
                },
            });

            // 그냥 likes를 리턴하면, 배열 안에 모든 객체를 담은 통짜 객체 하나가 리턴됨. 우리가 원하는 게 아님.
            return likes.map((like) => like.user);
        },
    },
};
