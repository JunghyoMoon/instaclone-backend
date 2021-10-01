import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
    try {
        if (!token) {
            return null;
        }
        // token을 key(서명)를 이용하여 해독함.
        const { id } = await jwt.verify(token, process.env.SECRET_KEY);

        const user = await client.user.findUnique({ where: { id } });

        if (user) {
            return user;
        } else {
            return null;
        }
    } catch {
        return null;
    }
};

// resolver를 감싸는 함수.
// resolver를 인자로 받은 후 resolver를 포함하는 함수 리턴함.
// 반환된 함수는 첫번째로 '로그인했는지?'를 검사. -> 로그인하지 않았다면 resolver는 리턴되지 않고, 에러를 뱉어낼 것임.
// 로그인했다면(context에 유저가 있다면,) 4가지 인자를 담아 resolver를 실행 후 최종적으로 resolver가 반환하는 값을 리턴.
export const protectedResolver = (resolver) => (root, args, context, info) => {
    if (!context.loggedInUser) {
        return {
            ok: false,
            error: "Please log in first to perform this.",
        };
    }
    return resolver(root, args, context, info);
};
