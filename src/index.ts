import express from "express";
const app = express();
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 8000;

const typeDefs = `
  type Query {
    ping: String
    say(name:String):String
  }
`;
const resolvers = {
  Query: {
    ping: () => "pong",
    say: ({ name }: { name: string }) => `Hey ${name}, how are you`,
  },
};
const gqlServer = new ApolloServer({
  typeDefs,
  resolvers,
});
await gqlServer.start();
app.use(cors(), express.json());
app.use("/graphql", expressMiddleware(gqlServer));

app.get("/", (req, res) => {
  res.json({ message: "server is on" });
});

app.listen(port, () => console.log(` server is listening on port ${port}`));
