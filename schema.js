import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";

// loadFilesSync: glob을 통해 파일들 검색
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.js`); // 이런걸  glob이라고 함.(pattern lang의 일종)
// 찾은 파일들을 묶어줌 (merge)
const typeDefs = mergeTypeDefs(loadedTypes);
const resolvers = mergeResolvers(loadedResolvers);

// type과 resolver를 묶어 '실행 가능한' schema를 생성.
const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
