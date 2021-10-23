import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        uploadPhoto: protectedResolver(
            async (_, { file, caption }, { loggedInUser }) => {
                let hashtagObj = [];
                if (caption) {
                    // parse hashtags from caption
                    const hashtags =
                        caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w-]+/g);
                    hashtagObj = hashtags.map((hashtag) => ({
                        where: { hashtag },
                        create: { hashtag },
                    }));
                    // get & create hashtags
                }
                return client.photo.create({
                    data: {
                        file,
                        caption,
                        user: {
                            connect: {
                                id: loggedInUser.id,
                            },
                        },
                        ...(hashtagObj.length > 0 && {
                            hashtags: {
                                connectOrCreate: hashtagObj,
                            },
                        }),
                    },
                });
                // save the photo with the parsed hashtag
                // add the photo to the hashtags
            }
        ),
    },
};
