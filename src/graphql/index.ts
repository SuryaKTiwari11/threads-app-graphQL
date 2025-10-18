import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./user/index.js";
import { resolvers } from "./user/index.js";

export async function createApolloGraphQLServer() {
  const gqlServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await gqlServer.start();

  return gqlServer;
}
