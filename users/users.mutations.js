import client from "../client";

export default {
    Mutation: {
        createAccount: async (
            _,
            { firstName, lastName, username, email, password }
        ) => {
            // check if username or email are already exist on DB.
            const exictingUser = await client.user.findFirst({
                where: {
                    OR: [
                        {
                            username,
                        },
                        {
                            email,
                        },
                    ],
                },
            });
            console.log(exictingUser);
            // if not : hash password,
            //          then, save and return user.
        },
    },
};
