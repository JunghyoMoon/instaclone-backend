export const processHashtags = (caption) => {
    // parse hashtags from caption
    // 단축평가로, caption에서 뽑아온 해쉬태그가 null 일 경우 빈 배열 반환해서 map 에러가 나지 않도록!
    const hashtags = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w-]+/g) || [];
    return hashtags.map((hashtag) => ({
        where: { hashtag },
        create: { hashtag },
    }));
};
